import { WorkflowConfig } from 'payload'

type WorkflowInput = {
  workflowId: string;
  input?: any;
  timeout?: number;
  memoryLimit?: number;
};

type WorkflowOutput = {
  result: any | null;
  logs: string[];
  error?: string;
};

export const executeWorkflow: WorkflowConfig<any> = {
  slug: 'executeWorkflow',
  inputSchema: [
    { name: 'workflowId', type: 'text', required: true },
    { name: 'input', type: 'json' },
    { name: 'timeout', type: 'number' },
    { name: 'memoryLimit', type: 'number' },
  ],
  outputSchema: [
    { name: 'result', type: 'json' },
    { name: 'logs', type: 'json' },
    { name: 'error', type: 'text' },
  ],
  handler: async function({ job, tasks, req }) {
    const { payload } = req;
    
    const input = job.input as unknown as WorkflowInput;
    const { workflowId, timeout = 5000, memoryLimit = 128 } = input;
    
    try {
      const workflow = await payload.findByID({
        collection: 'workflows',
        id: workflowId,
      });
      
      if (!workflow) {
        return { 
          result: null,
          error: `Workflow with ID ${workflowId} not found`,
          logs: [] 
        } as WorkflowOutput;
      }
      
      const ivm = await import('isolated-vm');
      const isolate = new ivm.Isolate({ memoryLimit });
      const context = await isolate.createContext();
      const logs: string[] = [];
      
      const mockApiObj = {
        get: async (path: string) => {
          logs.push(`API GET: ${path}`);
          return { success: true, message: 'Mock API response' };
        },
        post: async (path: string, data: any) => {
          logs.push(`API POST: ${path} with data: ${JSON.stringify(data)}`);
          return { success: true, message: 'Mock API response' };
        },
      };

      const mockAiObj = {
        generate: async (prompt: string) => {
          logs.push(`AI generate: ${prompt}`);
          return { text: 'Mock AI response' };
        },
        generateIdeas: async (params: any) => {
          logs.push(`AI generateIdeas: ${JSON.stringify(params)}`);
          return { ideas: ['Mock idea 1', 'Mock idea 2'] };
        },
      };

      const mockDbObj = {
        query: async (query: string) => {
          logs.push(`DB query: ${query}`);
          return { results: [] };
        },
        ideas: {
          findSimilar: async (params: any) => {
            logs.push(`DB ideas.findSimilar: ${JSON.stringify(params)}`);
            return [];
          },
          create: async (params: any) => {
            logs.push(`DB ideas.create: ${JSON.stringify(params)}`);
            return { id: 'mock-id', ...params };
          },
        },
      };

      const mockApiRef = new ivm.Reference(mockApiObj);
      const mockAiRef = new ivm.Reference(mockAiObj);
      const mockDbRef = new ivm.Reference(mockDbObj);

      await context.global.set('api', mockApiRef);
      await context.global.set('ai', mockAiRef);
      await context.global.set('db', mockDbRef);
      await context.global.set('event', new ivm.Reference({ data: input.input }));

      await context.global.set(
        'console',
        new ivm.Reference({
          log: (...args: any[]) => {
            const logMessage = args.map((arg) => 
              (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
            ).join(' ');
            logs.push(logMessage);
          },
        }),
      );

      const script = await isolate.compileScript(`
        (function() {
          try {
            ${workflow.code}
          } catch (error) {
            throw new Error(error.message || String(error));
          }
        })()
      `);

      let result = null;
      try {
        result = await script.run(context, { timeout });
      } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        return {
          result: null,
          error: errorMessage,
          logs,
        } as WorkflowOutput;
      } finally {
        context.release();
        isolate.dispose();
      }

      return {
        result,
        error: undefined,
        logs,
      } as WorkflowOutput;
    } catch (error: any) {
      return {
        result: null,
        error: error.message || String(error),
        logs: [],
      } as WorkflowOutput;
    }
  },
}
