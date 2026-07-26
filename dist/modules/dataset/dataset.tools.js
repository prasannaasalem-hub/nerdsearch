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
let DatasetTools = class DatasetTools {
    async searchDatasets(input, ctx) {
        ctx.logger.info('Searching datasets', { query: input.query, source: input.source });
        return {
            query: input.query,
            source: input.source || 'all',
            results: [
                {
                    id: 'dataset_001',
                    name: 'Sample Dataset for ' + input.query,
                    source: input.source || 'Kaggle',
                    description: `A sample dataset for ${input.query}.`,
                    url: 'https://example.com/datasets/sample',
                    size: '2GB',
                    tags: ['sample', 'demo']
                }
            ].slice(0, input.limit || 5),
            total: Math.min(1, input.limit || 5)
        };
    }
};
__decorate([
    Tool({
        name: 'search-datasets',
        title: 'Search datasets',
        description: 'Search for datasets by topic, source, or type.',
        inputSchema: z.object({
            query: z.string().describe('Search query for datasets'),
            source: z.string().optional().describe('Optional dataset source like Kaggle or UCI'),
            limit: z.number().optional().default(5).describe('Maximum number of results'),
        }),
        examples: {
            request: { query: 'medical imaging', source: 'Kaggle', limit: 5 },
            response: { query: 'medical imaging', results: [] }
        }
    }),
    Widget('dataset-hub'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DatasetTools.prototype, "searchDatasets", null);
DatasetTools = __decorate([
    Injectable()
], DatasetTools);
export { DatasetTools };
//# sourceMappingURL=dataset.tools.js.map