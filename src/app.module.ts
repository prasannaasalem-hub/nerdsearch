import { McpApp, Module, ConfigModule } from '@nitrostack/core';
import { CalculatorModule } from './modules/calculator/calculator.module.js';
import { ResearchModule } from './modules/research/research.module.js';
import { OrganizeModule } from './modules/organize/organize.module.js';
import { GithubModule } from './modules/github/github.module.js';
import { DatasetModule } from './modules/dataset/dataset.module.js';
import { LearningModule } from './modules/learning/learning.module.js';
import { ArchitectModule } from './modules/architect/architect.module.js';
import { HardwareModule } from './modules/hardware/hardware.module.js';
import { SystemHealthCheck } from './health/system.health.js';

/**
 * Root Application Module
 * 
 * This is the main module that bootstraps the MCP server.
 * It registers all feature modules and health checks.
 */
@McpApp({
  module: AppModule,
  server: {
    name: 'student-research-assistant',
    version: '1.0.0'
  },
  logging: {
    level: 'info'
  }
})
@Module({
  name: 'app',
  description: 'Root application module for the Student Research Assistant MCP server',
  imports: [
    ConfigModule.forRoot(),
    CalculatorModule,
    ResearchModule,
    OrganizeModule,
    GithubModule,
    DatasetModule,
    LearningModule,
    ArchitectModule,
    HardwareModule
  ],
  providers: [
    // Health Checks
    SystemHealthCheck,
  ]
})
export class AppModule {}

