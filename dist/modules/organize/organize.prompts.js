var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PromptDecorator as Prompt } from '@nitrostack/core';
/**
 * Organize Prompts
 *
 * Prompts to help users manage and organize their research collections.
 */
export class OrganizePrompts {
    async helpPrompt(args, context) {
        return [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: 'How do I organize my research papers into collections?',
                },
            },
            {
                role: 'assistant',
                content: {
                    type: 'text',
                    text: `You can organize research papers with two tools:

1. **save-to-collection** - Add a paper to a collection (creates the collection if it doesn't exist yet).
   Example: save-to-collection(paperId="paper_001", collectionName="AI Ethics")

2. **list-collections** - List all your collections, optionally filtered by name or tag.
   Example: list-collections(filter="AI")

Collections are stored with a name, description, tags, and the list of paper IDs they contain.`,
                },
            },
        ];
    }
}
__decorate([
    Prompt({
        name: 'organize-help',
        description: 'Explains how to save papers into collections and list existing collections.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizePrompts.prototype, "helpPrompt", null);
//# sourceMappingURL=organize.prompts.js.map