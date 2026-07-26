var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PromptDecorator } from '@nitrostack/core';
/**
 * Research Prompts
 *
 * Prompts to help users search for papers and get research recommendations.
 */
export class ResearchPrompts {
    async helpPrompt(args, context) {
        return [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: 'How do I search for academic papers and see their details?',
                },
            },
            {
                role: 'assistant',
                content: {
                    type: 'text',
                    text: `Use these tools to work with academic papers:

1. **search-papers** - Search by topic, with optional year and minimum-citation filters.
   Example: search-papers(query="machine learning in healthcare", limit=5)

2. **get-paper-details** - Get full metadata for a specific paper, including related papers.
   Example: get-paper-details(paperId="paper_001")

Results include title, authors, abstract, journal, year, DOI, keywords, and citation count.`,
                },
            },
        ];
    }
}
__decorate([
    PromptDecorator({
        name: 'research-help',
        description: 'Provide research-oriented prompt content for querying academic papers and insights.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResearchPrompts.prototype, "helpPrompt", null);
//# sourceMappingURL=research.prompts.js.map