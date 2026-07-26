import { Injectable, ConfigService } from '@nitrostack/core';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  license: string | null;
  updated_at: string;
}

export interface SearchReposResponse {
  query: string;
  results: GitHubRepo[];
  total: number;
  rateLimit: {
    remaining: number;
    reset: number;
  };
}

@Injectable({ deps: [ConfigService] })
export class GithubReposService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly token: string;
  private readonly timeout = 5000; // 5 seconds

  constructor(private configService: ConfigService) {
    this.token = this.configService.get('GITHUB_TOKEN') || '';
  }

  /**
   * Search GitHub repositories with optional filters
   * Mirrors the search-papers input schema for consistency
   */
  async searchRepos(params: {
    query: string;
    language?: string;
    minStars?: number;
    maxStars?: number;
    sort?: 'stars' | 'forks' | 'updated';
    limit?: number;
  }): Promise<SearchReposResponse> {
    if (!params.query || params.query.trim().length === 0) {
      throw new Error('Search query cannot be empty');
    }

    try {
      // Build search query with filters
      let searchQuery = params.query;
      if (params.language) {
        searchQuery += ` language:${params.language}`;
      }
      if (params.minStars) {
        searchQuery += ` stars:>=${params.minStars}`;
      }
      if (params.maxStars) {
        searchQuery += ` stars:<=${params.maxStars}`;
      }

      const sort = params.sort || 'stars';
      const perPage = Math.min(params.limit || 10, 100); // GitHub API max is 100

      const url = new URL(`${this.baseUrl}/search/repositories`);
      url.searchParams.append('q', searchQuery);
      url.searchParams.append('sort', sort);
      url.searchParams.append('order', 'desc');
      url.searchParams.append('per_page', perPage.toString());

      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NitroStack-Research-Assistant',
      };

      // Add authentication if token is available
      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle rate limiting
      const remaining = response.headers.get('x-ratelimit-remaining');
      const reset = response.headers.get('x-ratelimit-reset');

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            'GitHub API rate limit exceeded. Please try again later or provide a GITHUB_TOKEN.'
          );
        }
        if (response.status === 422) {
          throw new Error('Invalid search query. Please check your filters and try again.');
        }
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const data = await response.json() as {
        items?: Array<{
          id: number;
          name: string;
          full_name: string;
          html_url: string;
          description: string | null;
          stargazers_count: number;
          language: string | null;
          topics: string[];
          license: { name: string } | null;
          updated_at: string;
        }>;
      };

      if (!data.items || !Array.isArray(data.items)) {
        return {
          query: params.query,
          results: [],
          total: 0,
          rateLimit: {
            remaining: parseInt(remaining || '0', 10),
            reset: parseInt(reset || '0', 10),
          },
        };
      }

      const results: GitHubRepo[] = data.items.map((item) => ({
        id: item.id,
        name: item.name,
        full_name: item.full_name,
        url: item.html_url,
        description: item.description,
        stars: item.stargazers_count,
        language: item.language,
        topics: item.topics || [],
        license: item.license?.name || null,
        updated_at: item.updated_at,
      }));

      return {
        query: params.query,
        results,
        total: results.length,
        rateLimit: {
          remaining: parseInt(remaining || '0', 10),
          reset: parseInt(reset || '0', 10),
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        // Re-throw known errors
        if (
          error.message.includes('rate limit') ||
          error.message.includes('Invalid search') ||
          error.message.includes('GitHub API error')
        ) {
          throw error;
        }
        // Handle timeout
        if (error.name === 'AbortError') {
          throw new Error('GitHub API request timed out. Please try again.');
        }
      }
      throw new Error(`Failed to search GitHub repositories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
