import { ExecutionContext } from '@nitrostack/core';
interface Paper {
    id: string;
    title: string;
    authors: string[];
    abstract: string;
    journal: string;
    year: number;
    doi: string;
    imageUrl: string;
    keywords: string[];
    citations: number;
}
/**
 * Research Tools
 *
 * Tools for searching and retrieving academic papers
 */
export declare class ResearchTools {
    private papers;
    constructor();
    private loadPapers;
    searchPapers(input: {
        query: string;
        limit?: number;
        year?: number;
        minCitations?: number;
    }, ctx: ExecutionContext): Promise<{
        query: string;
        results: Paper[];
        total: number;
    }>;
    getPaperDetails(input: {
        paperId: string;
    }, ctx: ExecutionContext): Promise<{
        relatedPapers: {
            id: string;
            title: string;
            authors: string[];
        }[];
        id: string;
        title: string;
        authors: string[];
        abstract: string;
        journal: string;
        year: number;
        doi: string;
        imageUrl: string;
        keywords: string[];
        citations: number;
    }>;
}
export {};
//# sourceMappingURL=research.tools.d.ts.map