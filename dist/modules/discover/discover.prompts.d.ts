import { ExecutionContext } from '@nitrostack/core';
/**
 * Discover Prompts
 *
 * TODO: Add description
 */
export declare class DiscoverPrompts {
    helpPrompt(args: Record<string, unknown>, context: ExecutionContext): Promise<{
        role: "user";
        content: {
            type: "text";
            text: string;
        };
    }[]>;
}
//# sourceMappingURL=discover.prompts.d.ts.map