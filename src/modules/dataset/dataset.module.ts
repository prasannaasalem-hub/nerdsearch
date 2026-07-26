import { Module } from '@nitrostack/core';
import { DatasetTools } from './dataset.tools.js';

@Module({
  name: 'dataset',
  description: 'Dataset module for Kaggle, HuggingFace, and UCI dataset discovery and dataset recommendations.',
  controllers: [DatasetTools],
})
export class DatasetModule {}
