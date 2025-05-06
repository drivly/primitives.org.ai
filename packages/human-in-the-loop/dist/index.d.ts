import { z } from 'zod';
import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

/**
 * Supported platforms for human-in-the-loop interactions
 */
type HumanPlatform = 'slack' | 'teams' | 'react' | 'email';
/**
 * Status of a human task
 */
type HumanTaskStatus = 'pending' | 'completed' | 'timeout';
/**
 * Base configuration for Human Functions
 */
interface HumanFunctionConfig {
    /**
     * Title of the request shown to humans
     */
    title: string;
    /**
     * Description of the task for humans
     */
    description: string;
    /**
     * Platform to use for human interaction
     */
    platform: HumanPlatform;
    /**
     * Timeout in milliseconds after which the task is marked as timed out
     */
    timeout?: number;
    /**
     * Additional platform-specific options
     */
    [key: string]: any;
}
/**
 * A request for human input
 */
interface HumanTaskRequest {
    /**
     * Unique identifier for the task
     */
    taskId: string;
    /**
     * Current status of the task
     */
    status: HumanTaskStatus;
    /**
     * Platform-specific message ID
     */
    messageId?: Record<HumanPlatform, string>;
}
/**
 * Human Function interface with strongly-typed input and output
 */
interface HumanFunction<TInput, TOutput> {
    /**
     * Request human input with the given input data
     */
    request(input: TInput): Promise<HumanTaskRequest>;
    /**
     * Get the human response for a given task
     */
    getResponse(taskId: string): Promise<TOutput | null>;
}
/**
 * Platform-specific configurations
 */
interface PlatformConfigs {
    slack?: SlackConfig;
    teams?: TeamsConfig;
    react?: ReactConfig;
    email?: EmailConfig;
}
/**
 * Slack-specific configuration
 */
interface SlackConfig {
    /**
     * Slack channel to send the message to
     */
    channel?: string;
    /**
     * User IDs to mention in the message
     */
    mentions?: string[];
    /**
     * Whether to use a modal dialog instead of a message
     */
    modal?: boolean;
    /**
     * Custom Slack blocks
     */
    blocks?: any[];
    /**
     * Webhook URL for callbacks
     */
    webhookUrl?: string;
}
/**
 * Microsoft Teams specific configuration
 */
interface TeamsConfig {
    /**
     * Teams webhook URL
     */
    webhookUrl?: string;
    /**
     * Whether to use adaptive cards
     */
    useAdaptiveCards?: boolean;
}
/**
 * React-specific configuration
 */
interface ReactConfig {
    /**
     * Custom component styling
     */
    styles?: Record<string, any>;
    /**
     * Theme configuration
     */
    theme?: 'light' | 'dark' | 'system';
}
/**
 * Email-specific configuration
 */
interface EmailConfig {
    /**
     * Recipients of the email
     */
    to: string | string[];
    /**
     * CC recipients
     */
    cc?: string | string[];
    /**
     * BCC recipients
     */
    bcc?: string | string[];
    /**
     * From address
     */
    from?: string;
    /**
     * Reply-to address
     */
    replyTo?: string;
    /**
     * Callback URL for email responses
     */
    callbackUrl?: string;
}
/**
 * Options for creating human functions
 */
interface CreateHumanFunctionOptions extends HumanFunctionConfig, PlatformConfigs {
    /**
     * Optional validation schema for the output
     */
    outputSchema?: z.ZodType<any>;
}

/**
 * Create a strongly-typed human function
 */
declare function createHumanFunction<TInput, TOutput>(options: CreateHumanFunctionOptions): HumanFunction<TInput, TOutput>;

/**
 * Slack-specific response option
 */
interface SlackResponseOption {
    value: string;
    label: string;
}
/**
 * Create a Slack message with the given options
 */
declare function createSlackMessage<TInput, TOutput>(taskId: string, input: TInput, config: SlackConfig & {
    title: string;
    description: string;
    options?: string[] | SlackResponseOption[];
    freeText?: boolean;
}): Promise<{
    messageId: string;
}>;
/**
 * Get the response for a Slack task
 */
declare function getSlackResponse<TOutput>(taskId: string): Promise<TOutput | null>;
/**
 * Implementation of HumanFunction for Slack
 */
declare class SlackHumanFunction<TInput, TOutput> implements HumanFunction<TInput, TOutput> {
    private config;
    constructor(config: SlackConfig & {
        title: string;
        description: string;
        options?: string[] | SlackResponseOption[];
        freeText?: boolean;
    });
    request(input: TInput): Promise<HumanTaskRequest>;
    getResponse(taskId: string): Promise<TOutput | null>;
}

/**
 * Teams-specific response option
 */
interface TeamsResponseOption {
    value: string;
    label: string;
}
/**
 * Create a Teams message with the given options
 */
declare function createTeamsMessage<TInput, TOutput>(taskId: string, input: TInput, config: TeamsConfig & {
    title: string;
    description: string;
    options?: string[] | TeamsResponseOption[];
    freeText?: boolean;
}): Promise<{
    messageId: string;
}>;
/**
 * Get the response for a Teams task
 */
declare function getTeamsResponse<TOutput>(taskId: string): Promise<TOutput | null>;
/**
 * Implementation of HumanFunction for Microsoft Teams
 */
declare class TeamsHumanFunction<TInput, TOutput> implements HumanFunction<TInput, TOutput> {
    private config;
    constructor(config: TeamsConfig & {
        title: string;
        description: string;
        options?: string[] | TeamsResponseOption[];
        freeText?: boolean;
    });
    request(input: TInput): Promise<HumanTaskRequest>;
    getResponse(taskId: string): Promise<TOutput | null>;
}

/**
 * Props for the HumanFeedback component
 */
interface HumanFeedbackProps<TInput, TOutput> {
    taskId: string;
    title: string;
    description: string;
    input: TInput;
    options?: string[] | Array<{
        value: string;
        label: string;
    }>;
    freeText?: boolean;
    onSubmit: (response: Partial<TOutput>) => void;
    config?: ReactConfig;
}
/**
 * Simple React component for human feedback
 */
declare function HumanFeedback<TInput, TOutput>({ taskId, title, description, input, options, freeText, onSubmit, config }: HumanFeedbackProps<TInput, TOutput>): react_jsx_runtime.JSX.Element;
/**
 * Implementation of HumanFunction for React
 */
declare class ReactHumanFunction<TInput, TOutput> implements HumanFunction<TInput, TOutput> {
    private config;
    constructor(config: ReactConfig & {
        title: string;
        description: string;
        options?: string[] | Array<{
            value: string;
            label: string;
        }>;
        freeText?: boolean;
    });
    request(input: TInput): Promise<HumanTaskRequest>;
    getResponse(taskId: string): Promise<TOutput | null>;
    /**
     * Handle a response submission
     */
    handleResponse(taskId: string, response: TOutput): void;
    /**
     * Get a React component for this human function
     */
    getComponent(taskId: string, input: TInput): React.ReactNode;
}

/**
 * Basic Email Template component
 */
declare function EmailTemplate({ taskId, title, description, options, callbackUrl }: {
    taskId: string;
    title: string;
    description: string;
    options?: string[] | Array<{
        value: string;
        label: string;
    }>;
    callbackUrl?: string;
}): react_jsx_runtime.JSX.Element;
/**
 * Mock function to send an email
 */
declare function sendEmail(config: EmailConfig & {
    title: string;
    description: string;
    options?: string[] | Array<{
        value: string;
        label: string;
    }>;
    taskId: string;
}): Promise<{
    messageId: string;
}>;
/**
 * Get the response for an email task
 */
declare function getEmailResponse<TOutput>(taskId: string): Promise<TOutput | null>;
/**
 * Implementation of HumanFunction for Email
 */
declare class EmailHumanFunction<TInput, TOutput> implements HumanFunction<TInput, TOutput> {
    private config;
    constructor(config: EmailConfig & {
        title: string;
        description: string;
        options?: string[] | Array<{
            value: string;
            label: string;
        }>;
    });
    request(input: TInput): Promise<HumanTaskRequest>;
    getResponse(taskId: string): Promise<TOutput | null>;
    /**
     * Get a React component for this email template
     */
    getEmailComponent(taskId: string): React.ReactNode;
}

export { type CreateHumanFunctionOptions, type EmailConfig, EmailHumanFunction, EmailTemplate, HumanFeedback, type HumanFeedbackProps, type HumanFunction, type HumanFunctionConfig, type HumanPlatform, type HumanTaskRequest, type HumanTaskStatus, type PlatformConfigs, type ReactConfig, ReactHumanFunction, type SlackConfig, SlackHumanFunction, type SlackResponseOption, type TeamsConfig, TeamsHumanFunction, type TeamsResponseOption, createHumanFunction, createSlackMessage, createTeamsMessage, getEmailResponse, getSlackResponse, getTeamsResponse, sendEmail };
