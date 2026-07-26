import { ExecutionContext } from '@nitrostack/core';
export declare class LearningTools {
    getLearningRoadmap(input: {
        topic: string;
        level?: string;
    }, ctx: ExecutionContext): Promise<{
        topic: string;
        level: string;
        roadmap: {
            step: number;
            title: string;
            description: string;
        }[];
    }>;
}
//# sourceMappingURL=learning.tools.d.ts.map