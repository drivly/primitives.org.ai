import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { groq } from '@ai-sdk/groq';
import { bedrock } from '@ai-sdk/amazon-bedrock';
import { google } from '@ai-sdk/google';
import { vertex } from '@ai-sdk/google-vertex';
import { perplexity } from '@ai-sdk/perplexity';
import { createProviderRegistry } from 'ai';
export const registry = createProviderRegistry({
    anthropic,
    openai,
    xai,
    groq,
    bedrock,
    google,
    googleVertex: vertex,
    perplexity
}, { separator: '/' });
export const languageModel = (modelId) => {
    const [provider, model] = modelId.split('/');
    console.log(`Using provider: ${provider}, model: ${model}`);
    return {
        generate: async (options) => {
            return { text: `Response from ${modelId}` };
        },
        stream: async (options) => {
            return { text: `Streaming response from ${modelId}` };
        }
    };
};
