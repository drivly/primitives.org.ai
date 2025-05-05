/**
 * Legacy model function for backward compatibility
 * @param modelId The model identifier in the format "provider/model"
 * @returns Language model instance
 */
export declare const model: (modelId: string) => {
    generate: (options: any) => Promise<{
        text: string;
    }>;
    stream: (options: any) => Promise<{
        text: string;
    }>;
};
