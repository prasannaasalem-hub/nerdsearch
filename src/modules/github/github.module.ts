import { Module } from '@nitrostack/core';
import { GithubTools } from './github.tools.js';
import { GithubReposService } from './github-repos.service.js';

@Module({
  name: 'github',
  description: 'GitHub module for repository discovery, tech stack detection, and starter project recommendations.',
  controllers: [GithubTools],
  providers: [GithubReposService],
})
export class GithubModule {}
