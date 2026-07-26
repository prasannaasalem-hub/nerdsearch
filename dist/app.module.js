var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    McpApp({
        module: AppModule,
        server: {
            name: 'student-research-assistant',
            version: '1.0.0'
        },
        logging: {
            level: 'info'
        }
    }),
    Module({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map