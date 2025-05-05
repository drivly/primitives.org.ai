import { FC, ReactNode, useState, useEffect, useRef } from 'react'

interface AIProps {
  model: string | any;
  schema: Record<string, any>;
  prompt: string;
  stream?: boolean;
  children: (props: any, meta: { isStreaming: boolean }) => ReactNode;
}

export const AI: FC<AIProps> = ({ 
  model: modelInput, 
  schema, 
  prompt, 
  stream = false,
  children 
}) => {
  const [data, setData] = useState<any>({});
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const streamControllerRef = useRef<AbortController | null>(null);
  
  useEffect(() => {
    const modelObj = typeof modelInput === 'string' 
      ? { model: modelInput } 
      : modelInput;
    
    setError(null);
    
    if (stream) {
      setIsStreaming(true);
      
      const fetchStream = async () => {
        try {
          streamControllerRef.current = new AbortController();
          
          setIsStreaming(false);
          
        } catch (err: unknown) {
          const error = err as Error;
          if (error.name !== 'AbortError') {
            setError(error);
          }
        } finally {
          setIsStreaming(false);
        }
      };
      
      fetchStream();
    } else {
      setTimeout(() => {
        setData({ placeholder: 'Generated content will appear here' });
        setIsStreaming(false);
      }, 1000);
    }
    
    return () => {
      if (streamControllerRef.current) {
        streamControllerRef.current.abort();
        streamControllerRef.current = null;
      }
    };
  }, [modelInput, schema, prompt, stream]);
  
  return children(data, { isStreaming });
}
