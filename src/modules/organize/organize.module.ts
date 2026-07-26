import { Module } from '@nitrostack/core';
import { OrganizeTools } from './organize.tools.js';
import { OrganizeResources } from './organize.resources.js';
import { OrganizePrompts } from './organize.prompts.js';

@Module({
  name: 'organize',
  description: 'Organize module for managing research collections and saving papers for later reference.',
  controllers: [OrganizeTools, OrganizeResources, OrganizePrompts],
})
export class OrganizeModule {}
