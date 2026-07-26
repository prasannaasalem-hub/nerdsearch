import { Module } from '@nitrostack/core';
import { DiscoverTools } from './discover.tools.js';
import { DiscoverResources } from './discover.resources.js';
import { DiscoverPrompts } from './discover.prompts.js';

@Module({
  name: 'discover',
  description: 'TODO: Add description',
  controllers: [DiscoverTools, DiscoverResources, DiscoverPrompts],
})
export class DiscoverModule {}
