import { ExecutionContext } from '@nitrostack/core';
export declare class HardwareTools {
    getHardwareRecommendations(input: {
        projectType: string;
        budget?: string;
    }, ctx: ExecutionContext): Promise<{
        projectType: string;
        budget: string;
        recommendations: {
            component: string;
            useCase: string;
            notes: string;
        }[];
    }>;
}
//# sourceMappingURL=hardware.tools.d.ts.map