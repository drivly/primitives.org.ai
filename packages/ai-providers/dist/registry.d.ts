import '@ai-sdk/elevenlabs';
import '@ai-sdk/assemblyai';
import '@ai-sdk/deepgram';
import '@ai-sdk/gladia';
import '@ai-sdk/lmnt';
import '@ai-sdk/hume';
import '@ai-sdk/revai';
import { createProviderRegistry } from 'ai';
export declare const registry: ReturnType<typeof createProviderRegistry>;
export declare const languageModel: (modelId: string) => {
    generate: (options: any) => Promise<{
        text: string;
    }>;
    stream: (options: any) => Promise<{
        text: string;
    }>;
};
