import { ExecutionContext } from '@nitrostack/core';
/**
 * Organize Prompts
 *
 * Prompts to help users manage and organize their research collections.
 */
export declare class OrganizePrompts {
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
//# sourceMappingURL=organize.prompts.d.ts.map