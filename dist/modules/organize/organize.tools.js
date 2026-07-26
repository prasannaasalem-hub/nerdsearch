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
import * as fs from 'fs';
import * as path from 'path';
/**
 * Organize Tools
 *
 * Tools for managing research collections
 */
let OrganizeTools = class OrganizeTools {
    collections = [];
    collectionsPath;
    constructor() {
        this.collectionsPath = path.join(process.cwd(), 'fixtures', 'collections.json');
        this.loadCollections();
    }
    loadCollections() {
        try {
            const data = fs.readFileSync(this.collectionsPath, 'utf-8');
            this.collections = JSON.parse(data);
        }
        catch (error) {
            this.collections = [];
        }
    }
    saveCollections() {
        try {
            fs.writeFileSync(this.collectionsPath, JSON.stringify(this.collections, null, 2));
        }
        catch (error) {
            // Silently fail if unable to save
        }
    }
    async saveToCollection(input, ctx) {
        ctx.logger.info('Saving paper to collection', {
            paperId: input.paperId,
            collectionName: input.collectionName,
        });
        // Find or create collection
        let collection = this.collections.find((c) => c.name.toLowerCase() === input.collectionName.toLowerCase());
        if (!collection) {
            // Create new collection
            const newId = `collection_${Date.now()}`;
            collection = {
                id: newId,
                name: input.collectionName,
                description: `Collection: ${input.collectionName}`,
                imageUrl: 'https://images.unsplash.com/photo-1658806264102-2c516eae5e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5OTQ3NTl8MHwxfHNlYXJjaHwxfHxldGhpY3MlMjBwaGlsb3NvcGh5JTIwYWJzdHJhY3QlMjBjb25jZXB0fGVufDF8Mnx8fDE3ODUwMTE3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
                paperIds: [],
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            this.collections.push(collection);
        }
        // Add paper if not already in collection
        if (!collection.paperIds.includes(input.paperId)) {
            collection.paperIds.push(input.paperId);
            collection.updatedAt = new Date().toISOString();
            this.saveCollections();
        }
        return {
            success: true,
            message: 'Paper added to collection',
            collectionId: collection.id,
            collectionName: collection.name,
            paperCount: collection.paperIds.length,
        };
    }
    async listCollections(input, ctx) {
        ctx.logger.info('Listing collections', { filter: input.filter });
        // Reload collections to get latest state
        this.loadCollections();
        let results = this.collections;
        if (input.filter) {
            const filterLower = input.filter.toLowerCase();
            results = results.filter((c) => c.name.toLowerCase().includes(filterLower) ||
                c.description.toLowerCase().includes(filterLower) ||
                c.tags.some((t) => t.toLowerCase().includes(filterLower)));
        }
        const collections = results.map((c) => ({
            id: c.id,
            name: c.name,
            description: c.description,
            imageUrl: c.imageUrl,
            paperCount: c.paperIds.length,
            tags: c.tags,
        }));
        return {
            collections,
            total: collections.length,
        };
    }
};
__decorate([
    Tool({
        name: 'save-to-collection',
        description: 'Add a paper to a research collection. Creates the collection if it does not exist.',
        inputSchema: z.object({
            paperId: z.string().describe('The ID of the paper to add'),
            collectionName: z.string().describe('The name of the collection to add the paper to'),
        }),
        examples: {
            request: {
                paperId: 'paper_001',
                collectionName: 'AI Ethics',
            },
            response: {
                success: true,
                message: 'Paper added to collection',
                collectionId: 'collection_001',
                collectionName: 'AI Ethics',
                paperCount: 3,
            },
        },
    }),
    Widget('research-hub'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizeTools.prototype, "saveToCollection", null);
__decorate([
    Tool({
        name: 'list-collections',
        description: 'List all research collections with metadata and paper counts',
        inputSchema: z.object({
            filter: z.string().optional().describe('Optional filter by collection name or tag'),
        }),
        examples: {
            request: {
                filter: 'AI',
            },
            response: {
                collections: [
                    {
                        id: 'collection_001',
                        name: 'AI Ethics',
                        description: 'Research on ethical considerations...',
                        imageUrl: 'https://...',
                        paperCount: 2,
                        tags: ['ethics', 'bias', 'transparency'],
                    },
                ],
                total: 1,
            },
        },
    }),
    Widget('research-hub'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizeTools.prototype, "listCollections", null);
OrganizeTools = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], OrganizeTools);
export { OrganizeTools };
//# sourceMappingURL=organize.tools.js.map