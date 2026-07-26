import { ToolDecorator as Tool, Widget, z, ExecutionContext, Injectable } from '@nitrostack/core';

@Injectable()
export class DatasetTools {
  @Tool({
    name: 'search-datasets',
    title: 'Search datasets',
    description: 'Search for datasets by topic, source, or type.',
    inputSchema: z.object({
      query: z.string().describe('Search query for datasets'),
      source: z.string().optional().describe('Optional dataset source like Kaggle or UCI'),
      limit: z.number().optional().default(5).describe('Maximum number of results'),
    }),
    examples: {
      request: { query: 'medical imaging', source: 'Kaggle', limit: 5 },
      response: { query: 'medical imaging', results: [] }
    }
  })
  @Widget('dataset-hub')
  async searchDatasets(input: { query: string; source?: string; limit?: number }, ctx: ExecutionContext) {
    ctx.logger.info('Searching datasets', { query: input.query, source: input.source });

    return {
      query: input.query,
      source: input.source || 'all',
      results: [
        {
          id: 'dataset_001',
          name: 'Sample Dataset for ' + input.query,
          source: input.source || 'Kaggle',
          description: `A sample dataset for ${input.query}.`,
          url: 'https://example.com/datasets/sample',
          size: '2GB',
          tags: ['sample', 'demo']
        }
      ].slice(0, input.limit || 5),
      total: Math.min(1, input.limit || 5)
    };
  }
}
