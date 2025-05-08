import { z } from 'zod';

export const testSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});

export const testArraySchema = z.array(z.string());

export const testNestedSchema = z.object({
  user: z.object({
    id: z.string(),
    profile: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
  }),
  settings: z.object({
    theme: z.string(),
    notifications: z.boolean(),
  }),
});

export const getTestPrompt = (type: string) => {
  switch (type) {
    case 'simple':
      return 'Generate a short description of artificial intelligence';
    case 'complex':
      return 'Explain the differences between supervised, unsupervised, and reinforcement learning';
    case 'empty':
      return '';
    case 'long':
      return 'Generate a comprehensive essay on the history, current state, and future ' +
             'of artificial intelligence, covering all major developments from the inception ' + 
             'of the field to present day research areas and potential future directions. ' +
             'Include sections on machine learning, neural networks, computer vision, ' +
             'natural language processing, robotics, and ethical considerations. ' +
             'Discuss the philosophical implications of AI consciousness and superintelligence. ' +
             'Analyze the economic impact of AI automation on global labor markets. ' +
             'Examine the regulatory challenges posed by advanced AI systems. ' +
             'Consider the potential for human-AI collaboration across various domains.';
    case 'special-chars':
      return 'Generate text with special characters like: !@#$%^&*()_+-=[]{}|;\':",./<>?';
    case 'non-english':
      return '人工知能の短い説明を生成する';
    case 'user-data':
      return 'Create a user profile for a person named John Doe who is 30 years old and works as a software developer';
    case 'nested-data':
      return 'Create a nested user object with profile information and application settings';
    default:
      return 'Generate a short text response';
  }
};

export const AI_TEST_TIMEOUT = 30000; // 30 seconds
