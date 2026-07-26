import { ExecutionContext } from '@nitrostack/core';
/**
 * Research Prompts
 *
 * Prompts to help users search for papers and get research recommendations.
 */
export declare class ResearchPrompts {
    helpPrompt(args: Record<string, unknown>, context: ExecutionContext): Promise<({
        role: "user";
        content: {
            type: "text";
            text: string;
        };
    } | {
        role: "assistant";
        content: {
            type: "text";
            text: string;
        };
    })[]>;
}
//# sourceMappingURL=research.prompts.d.ts.map