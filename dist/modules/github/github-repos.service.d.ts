import { ConfigService } from '@nitrostack/core';
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
export declare class GithubReposService {
    private configService;
    private readonly baseUrl;
    private readonly token;
    private readonly timeout;
    constructor(configService: ConfigService);
    /**
     * Search GitHub repositories with optional filters
     * Mirrors the search-papers input schema for consistency
     */
    searchRepos(params: {
        query: string;
        language?: string;
        minStars?: number;
        maxStars?: number;
        sort?: 'stars' | 'forks' | 'updated';
        limit?: number;
    }): Promise<SearchReposResponse>;
}
//# sourceMappingURL=github-repos.service.d.ts.map