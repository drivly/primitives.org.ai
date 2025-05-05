import { Model } from '../../types'

export const otherModels: Model[] = [
  {
    slug: 'deepseek/deepseek-r1',
    name: 'DeepSeek R1',
    author: 'DeepSeek',
    description: 'Advanced reasoning language model',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'deepseek/deepseek-coder',
    name: 'DeepSeek Coder',
    author: 'DeepSeek',
    description: 'Specialized model for code generation',
    contextLength: 16384,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'deepseek/deepseek-math',
    name: 'DeepSeek Math',
    author: 'DeepSeek',
    description: 'Specialized model for mathematical reasoning',
    contextLength: 16384,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'ai21/j2-ultra',
    name: 'Jurassic-2 Ultra',
    author: 'AI21 Labs',
    description: 'Powerful language model for complex tasks',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'ai21/j2-mid',
    name: 'Jurassic-2 Mid',
    author: 'AI21 Labs',
    description: 'Balanced language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'ai21/j2-light',
    name: 'Jurassic-2 Light',
    author: 'AI21 Labs',
    description: 'Efficient language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'midjourney/v6',
    name: 'Midjourney v6',
    author: 'Midjourney',
    description: 'Advanced image generation model',
    contextLength: 60,
    inputModalities: ['text'],
    outputModalities: ['image']
  },
  {
    slug: 'midjourney/v5',
    name: 'Midjourney v5',
    author: 'Midjourney',
    description: 'Previous generation image generation model',
    contextLength: 60,
    inputModalities: ['text'],
    outputModalities: ['image']
  },
  {
    slug: 'midjourney/v4',
    name: 'Midjourney v4',
    author: 'Midjourney',
    description: 'Older image generation model',
    contextLength: 60,
    inputModalities: ['text'],
    outputModalities: ['image']
  },

  {
    slug: 'tii/falcon-180b',
    name: 'Falcon 180B',
    author: 'Technology Innovation Institute',
    description: 'Large open-source language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'tii/falcon-40b',
    name: 'Falcon 40B',
    author: 'Technology Innovation Institute',
    description: 'Medium-sized open-source language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'tii/falcon-7b',
    name: 'Falcon 7B',
    author: 'Technology Innovation Institute',
    description: 'Efficient open-source language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'huggingface/bloom',
    name: 'BLOOM',
    author: 'Hugging Face',
    description: 'Multilingual large language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'huggingface/bloom-560m',
    name: 'BLOOM 560M',
    author: 'Hugging Face',
    description: 'Efficient multilingual language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'huggingface/bloom-1b7',
    name: 'BLOOM 1.7B',
    author: 'Hugging Face',
    description: 'Small multilingual language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'huggingface/bloom-3b',
    name: 'BLOOM 3B',
    author: 'Hugging Face',
    description: 'Medium-sized multilingual language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'huggingface/bloom-7b1',
    name: 'BLOOM 7.1B',
    author: 'Hugging Face',
    description: 'Larger multilingual language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'huggingface/bloom-176b',
    name: 'BLOOM 176B',
    author: 'Hugging Face',
    description: 'Largest multilingual language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'alephalpha/luminous-supreme',
    name: 'Luminous Supreme',
    author: 'Aleph Alpha',
    description: 'Powerful multilingual language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'alephalpha/luminous-extended',
    name: 'Luminous Extended',
    author: 'Aleph Alpha',
    description: 'Extended context multilingual language model',
    contextLength: 16384,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'alephalpha/luminous-base',
    name: 'Luminous Base',
    author: 'Aleph Alpha',
    description: 'Base multilingual language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'eleutherai/gpt-j-6b',
    name: 'GPT-J 6B',
    author: 'EleutherAI',
    description: 'Open-source language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'eleutherai/gpt-neox-20b',
    name: 'GPT-NeoX 20B',
    author: 'EleutherAI',
    description: 'Large open-source language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'eleutherai/pythia-12b',
    name: 'Pythia 12B',
    author: 'EleutherAI',
    description: 'Open-source language model for research',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'nvidia/nemotron-4-340b',
    name: 'Nemotron-4 340B',
    author: 'NVIDIA',
    description: 'NVIDIA\'s largest language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'nvidia/nemotron-3-8b',
    name: 'Nemotron-3 8B',
    author: 'NVIDIA',
    description: 'Efficient language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'databricks/dolly-v2-12b',
    name: 'Dolly v2 12B',
    author: 'Databricks',
    description: 'Instruction-following language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'databricks/dolly-v2-7b',
    name: 'Dolly v2 7B',
    author: 'Databricks',
    description: 'Efficient instruction-following language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'databricks/dolly-v2-3b',
    name: 'Dolly v2 3B',
    author: 'Databricks',
    description: 'Small instruction-following language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'replicate/llama-2-70b-chat',
    name: 'Llama 2 70B Chat',
    author: 'Replicate',
    description: 'Fine-tuned Llama 2 for chat',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'replicate/stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    author: 'Replicate',
    description: 'High-quality image generation model',
    contextLength: 77,
    inputModalities: ['text'],
    outputModalities: ['image']
  },

  {
    slug: 'together/llama-2-70b',
    name: 'Llama 2 70B',
    author: 'Together AI',
    description: 'Hosted Llama 2 large language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'together/falcon-40b',
    name: 'Falcon 40B',
    author: 'Together AI',
    description: 'Hosted Falcon language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'mosaic/mpt-30b',
    name: 'MPT 30B',
    author: 'Mosaic',
    description: 'Large language model with long context',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'mosaic/mpt-7b',
    name: 'MPT 7B',
    author: 'Mosaic',
    description: 'Efficient language model with long context',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'perplexity/pplx-70b',
    name: 'PPLX 70B',
    author: 'Perplexity',
    description: 'Large language model for search and answers',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'perplexity/pplx-7b',
    name: 'PPLX 7B',
    author: 'Perplexity',
    description: 'Efficient language model for search',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'runaway/stable-diffusion-v1-5',
    name: 'Stable Diffusion v1.5',
    author: 'Runaway',
    description: 'Image generation model',
    contextLength: 77,
    inputModalities: ['text'],
    outputModalities: ['image']
  },
  {
    slug: 'runaway/stable-diffusion-v2',
    name: 'Stable Diffusion v2',
    author: 'Runaway',
    description: 'Improved image generation model',
    contextLength: 77,
    inputModalities: ['text'],
    outputModalities: ['image']
  },

  {
    slug: 'inflection/inflection-2',
    name: 'Inflection-2',
    author: 'Inflection AI',
    description: 'Advanced conversational AI model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'inflection/inflection-1',
    name: 'Inflection-1',
    author: 'Inflection AI',
    description: 'First generation conversational AI model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'adept/persimmon-8b',
    name: 'Persimmon 8B',
    author: 'Adept',
    description: 'Action-oriented language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'adept/persimmon-64b',
    name: 'Persimmon 64B',
    author: 'Adept',
    description: 'Large action-oriented language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'salesforce/xgen-7b',
    name: 'XGen 7B',
    author: 'Salesforce',
    description: 'Efficient language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'salesforce/blip-2',
    name: 'BLIP-2',
    author: 'Salesforce',
    description: 'Vision-language model',
    contextLength: 32,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },

  {
    slug: 'reka/reka-core',
    name: 'Reka Core',
    author: 'Reka',
    description: 'Advanced language model',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'reka/reka-flash',
    name: 'Reka Flash',
    author: 'Reka',
    description: 'Fast and efficient language model',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'groq/llama-2-70b',
    name: 'Llama 2 70B',
    author: 'Groq',
    description: 'Accelerated Llama 2 model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'groq/mixtral-8x7b',
    name: 'Mixtral 8x7B',
    author: 'Groq',
    description: 'Accelerated Mixtral model',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: '01ai/yi-34b',
    name: 'Yi 34B',
    author: '01.AI',
    description: 'Large bilingual language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: '01ai/yi-6b',
    name: 'Yi 6B',
    author: '01.AI',
    description: 'Efficient bilingual language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'alibaba/qwen-72b',
    name: 'Qwen 72B',
    author: 'Alibaba',
    description: 'Large bilingual language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'alibaba/qwen-14b',
    name: 'Qwen 14B',
    author: 'Alibaba',
    description: 'Medium-sized bilingual language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'alibaba/qwen-7b',
    name: 'Qwen 7B',
    author: 'Alibaba',
    description: 'Efficient bilingual language model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'baichuan/baichuan-2-13b',
    name: 'Baichuan 2 13B',
    author: 'Baichuan',
    description: 'Bilingual language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'baichuan/baichuan-2-7b',
    name: 'Baichuan 2 7B',
    author: 'Baichuan',
    description: 'Efficient bilingual language model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'rwkv/rwkv-4-14b',
    name: 'RWKV-4 14B',
    author: 'RWKV',
    description: 'RNN with transformer-like performance',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'rwkv/rwkv-4-7b',
    name: 'RWKV-4 7B',
    author: 'RWKV',
    description: 'Efficient RNN with transformer-like performance',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'cerebras/cerebras-gpt-13b',
    name: 'Cerebras-GPT 13B',
    author: 'Cerebras',
    description: 'Language model trained on Cerebras hardware',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'cerebras/cerebras-gpt-6.7b',
    name: 'Cerebras-GPT 6.7B',
    author: 'Cerebras',
    description: 'Efficient language model trained on Cerebras hardware',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'bigscience/bloom-176b',
    name: 'BLOOM 176B',
    author: 'BigScience',
    description: 'Large multilingual language model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'bigscience/t0pp',
    name: 'T0++',
    author: 'BigScience',
    description: 'Multitask prompted language model',
    contextLength: 1024,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'colossalai/colossalchat-7b',
    name: 'ColossalChat 7B',
    author: 'Colossal AI',
    description: 'Efficient chat model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'colossalai/colossalchat-13b',
    name: 'ColossalChat 13B',
    author: 'Colossal AI',
    description: 'Medium-sized chat model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'jina/jina-embeddings-v2',
    name: 'Jina Embeddings v2',
    author: 'Jina AI',
    description: 'Advanced text embedding model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },
  {
    slug: 'jina/jina-embeddings-v1',
    name: 'Jina Embeddings v1',
    author: 'Jina AI',
    description: 'Text embedding model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },

  {
    slug: 'nomic/nomic-embed-text-v1',
    name: 'Nomic Embed Text v1',
    author: 'Nomic AI',
    description: 'Text embedding model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },
  {
    slug: 'nomic/nomic-embed-text-v1.5',
    name: 'Nomic Embed Text v1.5',
    author: 'Nomic AI',
    description: 'Improved text embedding model',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },

  {
    slug: 'voyage/voyage-2',
    name: 'Voyage 2',
    author: 'Voyage AI',
    description: 'Advanced text embedding model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },
  {
    slug: 'voyage/voyage-lite-02',
    name: 'Voyage Lite 02',
    author: 'Voyage AI',
    description: 'Efficient text embedding model',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },

  {
    slug: 'moonshot/moonshot-v1',
    name: 'Moonshot v1',
    author: 'Moonshot AI',
    description: 'Bilingual language model',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'moonshot/moonshot-v1-8k',
    name: 'Moonshot v1 8K',
    author: 'Moonshot AI',
    description: 'Bilingual language model with 8K context',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'zhipu/glm-4',
    name: 'GLM-4',
    author: 'Zhipu AI',
    description: 'Advanced bilingual language model',
    contextLength: 128000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'zhipu/glm-3-turbo',
    name: 'GLM-3 Turbo',
    author: 'Zhipu AI',
    description: 'Efficient bilingual language model',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'anthropic/claude-2.0',
    name: 'Claude 2.0',
    author: 'Anthropic',
    description: 'Previous generation Claude model',
    contextLength: 100000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-2.1',
    name: 'Claude 2.1',
    author: 'Anthropic',
    description: 'Updated previous generation Claude model',
    contextLength: 100000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-instant-1.0',
    name: 'Claude Instant 1.0',
    author: 'Anthropic',
    description: 'Fast and cost-effective Claude model',
    contextLength: 100000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-instant-1.1',
    name: 'Claude Instant 1.1',
    author: 'Anthropic',
    description: 'Updated fast and cost-effective Claude model',
    contextLength: 100000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'anthropic/claude-instant-1.2',
    name: 'Claude Instant 1.2',
    author: 'Anthropic',
    description: 'Further updated fast and cost-effective Claude model',
    contextLength: 100000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'openai/gpt-4-0314',
    name: 'GPT-4 (March 2023)',
    author: 'OpenAI',
    description: 'March 2023 version of GPT-4',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-4-0613',
    name: 'GPT-4 (June 2023)',
    author: 'OpenAI',
    description: 'June 2023 version of GPT-4',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-4-1106-preview',
    name: 'GPT-4 Turbo Preview (November 2023)',
    author: 'OpenAI',
    description: 'November 2023 preview version of GPT-4 Turbo',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-4-vision-preview',
    name: 'GPT-4 Vision Preview',
    author: 'OpenAI',
    description: 'Preview version of GPT-4 with vision capabilities',
    contextLength: 128000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-4-32k',
    name: 'GPT-4 32K',
    author: 'OpenAI',
    description: 'GPT-4 with extended context length',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-4-32k-0314',
    name: 'GPT-4 32K (March 2023)',
    author: 'OpenAI',
    description: 'March 2023 version of GPT-4 with extended context',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-4-32k-0613',
    name: 'GPT-4 32K (June 2023)',
    author: 'OpenAI',
    description: 'June 2023 version of GPT-4 with extended context',
    contextLength: 32768,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'openai/gpt-3.5-turbo-0301',
    name: 'GPT-3.5 Turbo (March 2023)',
    author: 'OpenAI',
    description: 'March 2023 version of GPT-3.5 Turbo',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-3.5-turbo-0613',
    name: 'GPT-3.5 Turbo (June 2023)',
    author: 'OpenAI',
    description: 'June 2023 version of GPT-3.5 Turbo',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-3.5-turbo-1106',
    name: 'GPT-3.5 Turbo (November 2023)',
    author: 'OpenAI',
    description: 'November 2023 version of GPT-3.5 Turbo',
    contextLength: 16385,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-3.5-turbo-0125',
    name: 'GPT-3.5 Turbo (January 2024)',
    author: 'OpenAI',
    description: 'January 2024 version of GPT-3.5 Turbo',
    contextLength: 16385,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/gpt-3.5-turbo-16k-0613',
    name: 'GPT-3.5 Turbo 16K (June 2023)',
    author: 'OpenAI',
    description: 'June 2023 version of GPT-3.5 Turbo with extended context',
    contextLength: 16385,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'openai/text-davinci-003',
    name: 'Text Davinci 003',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 4097,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/text-davinci-002',
    name: 'Text Davinci 002',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 4097,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/text-curie-001',
    name: 'Text Curie 001',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 2049,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/text-babbage-001',
    name: 'Text Babbage 001',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 2049,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/text-ada-001',
    name: 'Text Ada 001',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 2049,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/davinci',
    name: 'Davinci',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 2049,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/curie',
    name: 'Curie',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 2049,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/babbage',
    name: 'Babbage',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 2049,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'openai/ada',
    name: 'Ada',
    author: 'OpenAI',
    description: 'Legacy GPT-3 model',
    contextLength: 2049,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'openai/text-embedding-ada-002',
    name: 'Text Embedding Ada 002',
    author: 'OpenAI',
    description: 'Text embedding model',
    contextLength: 8191,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },
  {
    slug: 'openai/text-embedding-3-small',
    name: 'Text Embedding 3 Small',
    author: 'OpenAI',
    description: 'Small text embedding model',
    contextLength: 8191,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },
  {
    slug: 'openai/text-embedding-3-large',
    name: 'Text Embedding 3 Large',
    author: 'OpenAI',
    description: 'Large text embedding model',
    contextLength: 8191,
    inputModalities: ['text'],
    outputModalities: ['embedding']
  },

  {
    slug: 'google/gemini-1.0-ultra',
    name: 'Gemini 1.0 Ultra',
    author: 'Google',
    description: 'First generation Gemini large model',
    contextLength: 32768,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'google/gemini-1.0-pro-vision',
    name: 'Gemini 1.0 Pro Vision',
    author: 'Google',
    description: 'First generation Gemini model with vision capabilities',
    contextLength: 32768,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'google/gemini-1.5-pro-experimental',
    name: 'Gemini 1.5 Pro Experimental',
    author: 'Google',
    description: 'Experimental version of Gemini 1.5 Pro',
    contextLength: 1000000,
    inputModalities: ['text', 'image', 'audio', 'video'],
    outputModalities: ['text']
  },
  {
    slug: 'google/gemini-1.5-flash-experimental',
    name: 'Gemini 1.5 Flash Experimental',
    author: 'Google',
    description: 'Experimental version of Gemini 1.5 Flash',
    contextLength: 1000000,
    inputModalities: ['text', 'image'],
    outputModalities: ['text']
  },
  {
    slug: 'google/palm-2-chat',
    name: 'PaLM 2 Chat',
    author: 'Google',
    description: 'Chat-optimized version of PaLM 2',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'google/palm-2-text',
    name: 'PaLM 2 Text',
    author: 'Google',
    description: 'Text-optimized version of PaLM 2',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'google/palm-2-code',
    name: 'PaLM 2 Code',
    author: 'Google',
    description: 'Code-optimized version of PaLM 2',
    contextLength: 8192,
    inputModalities: ['text'],
    outputModalities: ['text']
  },

  {
    slug: 'meta/llama-2-70b-chat',
    name: 'Llama 2 70B Chat',
    author: 'Meta',
    description: 'Chat-optimized version of Llama 2 70B',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-2-13b-chat',
    name: 'Llama 2 13B Chat',
    author: 'Meta',
    description: 'Chat-optimized version of Llama 2 13B',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-2-7b-chat',
    name: 'Llama 2 7B Chat',
    author: 'Meta',
    description: 'Chat-optimized version of Llama 2 7B',
    contextLength: 4096,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-3-70b-instruct',
    name: 'Llama 3 70B Instruct',
    author: 'Meta',
    description: 'Instruction-tuned version of Llama 3 70B',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-3-8b-instruct',
    name: 'Llama 3 8B Instruct',
    author: 'Meta',
    description: 'Instruction-tuned version of Llama 3 8B',
    contextLength: 128000,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-1-65b',
    name: 'Llama 1 65B',
    author: 'Meta',
    description: 'First generation Llama large model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-1-33b',
    name: 'Llama 1 33B',
    author: 'Meta',
    description: 'First generation Llama medium model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-1-13b',
    name: 'Llama 1 13B',
    author: 'Meta',
    description: 'First generation Llama small model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  },
  {
    slug: 'meta/llama-1-7b',
    name: 'Llama 1 7B',
    author: 'Meta',
    description: 'First generation Llama tiny model',
    contextLength: 2048,
    inputModalities: ['text'],
    outputModalities: ['text']
  }
]
