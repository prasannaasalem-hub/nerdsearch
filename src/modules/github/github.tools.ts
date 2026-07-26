import { ToolDecorator as Tool, Widget, z, ExecutionContext, Injectable } from '@nitrostack/core';
import { GithubReposService } from './github-repos.service.js';

@Injectable({ deps: [GithubReposService] })
export class GithubTools {
  constructor(private githubReposService: GithubReposService) {}

  @Tool({
    name: 'search-github-projects',
    title: 'Search GitHub projects',
    description: 'Find GitHub projects based on topic, language, or tag.',
    inputSchema: z.object({
      query: z.string().describe('Search query for GitHub projects'),
      language: z.string().optional().describe('Optional programming language filter'),
      limit: z.number().optional().default(5).describe('Maximum results'),
    }),
    examples: {
      request: { query: 'voice assistant', language: 'typescript', limit: 5 },
      response: { projects: [] }
    }
  })
  @Widget('github-hub')
  async searchGithubProjects(input: { query: string; language?: string; limit?: number }, ctx: ExecutionContext) {
    ctx.logger.info('Searching GitHub projects', { query: input.query, language: input.language });

    return {
      query: input.query,
      language: input.language || 'any',
      projects: [
        {
          id: 'repo_001',
          name: 'sample-repo',
          url: 'https://github.com/example/sample-repo',
          description: `Sample ${input.language || 'general'} project for ${input.query}.`,
          stars: 123,
          language: input.language || 'TypeScript'
        }
      ].slice(0, input.limit || 5)
    };
  }

  @Tool({
    name: 'search-github-repos',
    title: 'Search GitHub repositories',
    description: 'Search for GitHub repositories related to a project with optional filters (mirrors search-papers inputs)',
    inputSchema: z.object({
      query: z.string().describe('Search query (e.g., "machine learning in healthcare")'),
      language: z.string().optional().describe('Filter by programming language'),
      minStars: z.number().optional().describe('Filter by minimum star count'),
      maxStars: z.number().optional().describe('Filter by maximum star count'),
      sort: z.enum(['stars', 'forks', 'updated']).optional().default('stars').describe('Sort results by'),
      limit: z.number().optional().default(10).describe('Maximum number of results to return (default: 10)'),
    }),
    examples: {
      request: {
        query: 'machine learning in healthcare',
        language: 'python',
        minStars: 100,
        limit: 5,
      },
      response: {
        query: 'machine learning in healthcare',
        results: [
          {
            id: 12345,
            name: 'ml-healthcare',
            full_name: 'user/ml-healthcare',
            url: 'https://github.com/user/ml-healthcare',
            description: 'Machine learning for healthcare applications',
            stars: 1250,
            language: 'Python',
            topics: ['machine-learning', 'healthcare'],
            license: 'MIT',
            updated_at: '2024-01-15T10:30:00Z',
          },
        ],
        total: 1,
        rateLimit: {
          remaining: 59,
          reset: 1234567890,
        },
      },
    },
  })
  @Widget('github-repos-search')
  async searchGithubRepos(
    input: {
      query: string;
      language?: string;
      minStars?: number;
      maxStars?: number;
      sort?: 'stars' | 'forks' | 'updated';
      limit?: number;
    },
    ctx: ExecutionContext
  ) {
    ctx.logger.info('Searching GitHub repositories', {
      query: input.query,
      language: input.language,
      minStars: input.minStars,
      maxStars: input.maxStars,
      sort: input.sort,
      limit: input.limit,
    });

    try {
      const result = await this.githubReposService.searchRepos({
        query: input.query,
        language: input.language,
        minStars: input.minStars,
        maxStars: input.maxStars,
        sort: input.sort || 'stars',
        limit: input.limit || 10,
      });

      return result;
    } catch (error) {
      ctx.logger.error('Error searching GitHub repositories', {
        error: error instanceof Error ? error.message : 'Unknown error',
        query: input.query,
      });

      throw error;
    }
  }
}
