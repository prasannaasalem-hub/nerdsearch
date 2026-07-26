import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

/**
 * Research Resources
 * 
 * Example resources for academic research insights and paper discovery.
 */
export class ResearchResources {
  @Resource({
    uri: 'research://example',
    name: 'Research Example Resource',
    description: 'Example research resource containing JSON metadata for academic paper discovery.',
    mimeType: 'application/json',
  })
  async exampleResource(uri: string, context: ExecutionContext) {
    return {
      type: 'text' as const,
      text: JSON.stringify(
        {
          example: {
            id: 'paper_example',
            title: 'Example Paper Title',
            authors: ['Jane Doe'],
            year: 2024,
            keywords: ['example', 'research'],
          },
        },
        null,
        2
      ),
    };
  }
}
