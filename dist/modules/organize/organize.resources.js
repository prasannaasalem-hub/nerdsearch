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
 * Organize Resources
 *
 * Reference metadata describing the collection organization feature.
 */
export class OrganizeResources {
    async exampleResource(uri, context) {
        return {
            type: 'text',
            text: JSON.stringify({
                example: {
                    id: 'collection_example',
                    name: 'Example Collection',
                    description: 'A sample research collection',
                    paperIds: [],
                    tags: [],
                },
            }, null, 2),
        };
    }
}
__decorate([
    Resource({
        uri: 'organize://example',
        name: 'Organize Example Resource',
        description: 'Example metadata describing how research collections are structured.',
        mimeType: 'application/json',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizeResources.prototype, "exampleResource", null);
//# sourceMappingURL=organize.resources.js.map