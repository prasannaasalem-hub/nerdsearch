import { ExecutionContext } from '@nitrostack/core';
export declare class ArchitectTools {
    createProjectBlueprint(input: {
        projectName: string;
        domain: string;
    }, ctx: ExecutionContext): Promise<{
        projectName: string;
        domain: string;
        blueprint: {
            research: string;
            datasets: string;
            github: string;
            hardware: string;
            learning: string;
        };
    }>;
}
//# sourceMappingURL=architect.tools.d.ts.map