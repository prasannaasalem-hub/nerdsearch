import { Module } from '@nitrostack/core';
import { LearningTools } from './learning.tools.js';

@Module({
  name: 'learning',
  description: 'Learning module for roadmaps, documentation, and tutorial guidance.',
  controllers: [LearningTools],
})
export class LearningModule {}
