var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ResourceDecorator as Resource } from '@nitrostack/core';
/**
 * Research Resources
 *
 * Example resources for academic research insights and paper discovery.
 */
export class ResearchResources {
    async exampleResource(uri, context) {
        return {
            type: 'text',
            text: JSON.stringify({
                example: {
                    id: 'paper_example',
                    title: 'Example Paper Title',
                    authors: ['Jane Doe'],
                    year: 2024,
                    keywords: ['example', 'research'],
                },
            }, null, 2),
        };
    }
}
__decorate([
    Resource({
        uri: 'research://example',
        name: 'Research Example Resource',
        description: 'Example research resource containing JSON metadata for academic paper discovery.',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResearchResources.prototype, "exampleResource", null);
//# sourceMappingURL=research.resources.js.map