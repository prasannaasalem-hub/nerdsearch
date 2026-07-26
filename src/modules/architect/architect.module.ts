import { Module } from '@nitrostack/core';
import { ArchitectTools } from './architect.tools.js';

@Module({
  name: 'architect',
  description: 'Architect module that combines research, dataset, GitHub, hardware, and learning outputs into a project blueprint.',
  controllers: [ArchitectTools],
})
export class ArchitectModule {}
