import { ExecutionContext } from '@nitrostack/core';
import { GithubReposService } from './github-repos.service.js';
export declare class GithubTools {
    private githubReposService;
    constructor(githubReposService: GithubReposService);
    searchGithubProjects(input: {
        query: string;
        language?: string;
        limit?: number;
    }, ctx: ExecutionContext): Promise<{
        query: string;
        language: string;
        projects: {
            id: string;
            name: string;
            url: string;
            description: string;
            stars: number;
            language: string;
        }[];
    }>;
    searchGithubRepos(input: {
        query: string;
        language?: string;
        minStars?: number;
        maxStars?: number;
        sort?: 'stars' | 'forks' | 'updated';
        limit?: number;
    }, ctx: ExecutionContext): Promise<import("./github-repos.service.js").SearchReposResponse>;
}
//# sourceMappingURL=github.tools.d.ts.map