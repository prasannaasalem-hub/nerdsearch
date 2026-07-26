import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

/**
 * Organize Prompts
 *
 * Prompts to help users manage and organize their research collections.
 */
export class OrganizePrompts {
  @Prompt({
    name: 'organize-help',
    description: 'Explains how to save papers into collections and list existing collections.',
  })
  async helpPrompt(args: Record<string, unknown>, context: ExecutionContext) {
    return [
      {
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: 'How do I organize my research papers into collections?',
        },
      },
      {
        role: 'assistant' as const,
        content: {
          type: 'text' as const,
          text: `You can organize research papers with two tools:

1. **save-to-collection** - Add a paper to a collection (creates the collection if it doesn't exist yet).
   Example: save-to-collection(paperId="paper_001", collectionName="AI Ethics")

2. **list-collections** - List all your collections, optionally filtered by name or tag.
   Example: list-collections(filter="AI")

Collections are stored with a name, description, tags, and the list of paper IDs they contain.`,
        },
      },
    ];
  }
}
