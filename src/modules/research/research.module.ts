import { Module } from '@nitrostack/core';
import { ResearchTools } from './research.tools.js';
import { ResearchResources } from './research.resources.js';
import { ResearchPrompts } from './research.prompts.js';

@Module({
  name: 'research',
  description: 'Research module for academic paper discovery, gap analysis, and feasibility evaluation.',
  controllers: [ResearchTools, ResearchResources, ResearchPrompts],
})
export class ResearchModule {}
