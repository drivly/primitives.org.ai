import { CollectionConfig } from 'payload/types';

/**
 * Type definitions for Goals and OKRs
 */
/**
 * Goal definition
 */
interface Goal {
    id: string;
    name?: string;
    description?: string;
    status?: 'not_started' | 'in_progress' | 'completed' | 'canceled';
    dueDate?: string;
    completedDate?: string;
    owner?: string;
    metrics?: Record<string, any>;
    progress?: number;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high' | 'critical';
    updatedAt: string;
    createdAt: string;
}
/**
 * Goal Milestone definition
 */
interface Milestone {
    id: string;
    goal?: string | Goal;
    name?: string;
    description?: string;
    dueDate?: string;
    completedDate?: string;
    status?: 'not_started' | 'in_progress' | 'completed' | 'canceled';
    progress?: number;
    updatedAt: string;
    createdAt: string;
}
/**
 * Key Result definition - can be either a string or an object
 */
type KeyResult = string | {
    description: string;
    target?: number;
    currentValue?: number;
    unit?: string;
    kpiRelationship?: string;
    progress?: number;
};
/**
 * Objective definition with key results
 */
interface Objective {
    description: string;
    keyResults: KeyResult[];
}
/**
 * Input for creating goals with objectives and key results
 */
interface GoalsInput {
    [key: string]: Objective;
}
/**
 * Goals instance returned by the Goals function
 */
interface GoalsInstance {
    save(): Promise<Record<string, Goal>>;
    updateProgress(objectiveKey: string, keyResult: string | number, progress: number): Promise<void>;
    getProgress(): Promise<Record<string, {
        progress: number;
        keyResults: Record<string, number>;
    }>>;
    toJSON(): GoalsInput;
}

/**
 * Type definitions for Plans
 */
/**
 * Plan definition
 */
interface Plan {
    id: string;
    name?: string;
    description?: string;
    status?: 'draft' | 'active' | 'completed' | 'archived';
    startDate?: string;
    endDate?: string;
    owner?: string;
    steps?: Array<PlanStep>;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high' | 'critical';
    updatedAt: string;
    createdAt: string;
}
/**
 * Plan Step definition
 */
interface PlanStep {
    id: string;
    plan?: string | Plan;
    name?: string;
    description?: string;
    order?: number;
    duration?: number;
    dependencies?: string[] | PlanStep[];
    assignee?: string;
    status?: 'not_started' | 'in_progress' | 'completed' | 'blocked';
    updatedAt: string;
    createdAt: string;
}

declare const Goals: CollectionConfig;

declare const Plans: CollectionConfig;

/**
 * Create a StoryBrand framework for a business or product
 *
 * @param input - Input data or string to create StoryBrand for
 * @param config - Configuration options
 * @returns A StoryBrand framework object
 */
declare const storyBrand: (input: any, config?: {
    modelName?: string;
    system?: string;
    temperature?: number;
}) => Promise<any>;

/**
 * Create a Lean Canvas for a business idea or product
 *
 * @param input - Input data or string to create Lean Canvas for
 * @param config - Configuration options
 * @returns A Lean Canvas object
 */
declare const leanCanvas: (input: any, config?: {
    modelName?: string;
    system?: string;
    temperature?: number;
}) => Promise<any>;

export { type Goal, Goals, type GoalsInput, type GoalsInstance, type KeyResult, type Milestone, type Objective, type Plan, type PlanStep, Plans, leanCanvas, storyBrand };
