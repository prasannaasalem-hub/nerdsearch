import { PromptDecorator, ExecutionContext } from '@nitrostack/core';

/**
 * Research Prompts
 * 
 * Prompts to help users search for papers and get research recommendations.
 */
export class ResearchPrompts {
  @PromptDecorator({
    name: 'research-help',
    description: 'Provide research-oriented prompt content for querying academic papers and insights.',
  })
  async helpPrompt(args: Record<string, unknown>, context: ExecutionContext) {
    return [
      {
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: 'How do I search for academic papers and see their details?',
        },
      },
      {
        role: 'assistant' as const,
        content: {
          type: 'text' as const,
          text: `Use these tools to work with academic papers:

1. **search-papers** - Search by topic, with optional year and minimum-citation filters.
   Example: search-papers(query="machine learning in healthcare", limit=5)

2. **get-paper-details** - Get full metadata for a specific paper, including related papers.
   Example: get-paper-details(paperId="paper_001")

Results include title, authors, abstract, journal, year, DOI, keywords, and citation count.`,
        },
      },
    ];
  }
}
