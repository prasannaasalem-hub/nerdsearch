var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, Widget, z, Injectable } from '@nitrostack/core';
let LearningTools = class LearningTools {
    async getLearningRoadmap(input, ctx) {
        ctx.logger.info('Getting learning roadmap', { topic: input.topic, level: input.level });
        return {
            topic: input.topic,
            level: input.level || 'beginner',
            roadmap: [
                { step: 1, title: 'Understand core concepts', description: `Learn the fundamentals of ${input.topic}.` },
                { step: 2, title: 'Practice with examples', description: 'Build small projects to reinforce learning.' },
                { step: 3, title: 'Read documentation', description: 'Explore official docs and guides.' }
            ]
        };
    }
};
__decorate([
    Tool({
        name: 'get-learning-roadmap',
        title: 'Get learning roadmap',
        description: 'Generate a learning roadmap for a given subject or technology.',
        inputSchema: z.object({
            topic: z.string().describe('The topic or technology to learn'),
            level: z.string().optional().describe('Target experience level, e.g. beginner, intermediate'),
        }),
        examples: {
            request: { topic: 'machine learning', level: 'beginner' },
            response: { roadmap: [] }
        }
    }),
    Widget('learning-hub'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LearningTools.prototype, "getLearningRoadmap", null);
LearningTools = __decorate([
    Injectable()
], LearningTools);
export { LearningTools };
//# sourceMappingURL=learning.tools.js.map