import { ToolDecorator as Tool, Widget, z, ExecutionContext, Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

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
 * Discover Tools
 * 
 * Tools for searching and retrieving academic papers
 */
@Injectable()
export class DiscoverTools {
  private papers: Paper[] = [];

  constructor() {
    this.loadPapers();
  }

  private loadPapers() {
    try {
      const fixturesPath = path.join(process.cwd(), 'fixtures', 'papers.json');
      const data = fs.readFileSync(fixturesPath, 'utf-8');
      this.papers = JSON.parse(data);
    } catch (error) {
      // Fallback to empty array if file not found
      this.papers = [];
    }
  }

  @Tool({
    name: 'search-papers',
    description: 'Search for academic papers on a given topic with optional filters',
    inputSchema: z.object({
      query: z.string().describe('Search query (e.g., "machine learning in healthcare")'),
      limit: z.number().optional().describe('Maximum number of results to return (default: 10)'),
      year: z.number().optional().describe('Filter by publication year'),
      minCitations: z.number().optional().describe('Filter by minimum citation count'),
    }),
    examples: {
      request: {
        query: 'machine learning in healthcare',
        limit: 5,
      },
      response: {
        query: 'machine learning in healthcare',
        results: [
          {
            id: 'paper_001',
            title: 'Deep Learning Applications in Healthcare',
            authors: ['Sarah Chen', 'Michael Rodriguez'],
            abstract: 'This paper surveys...',
            journal: 'IEEE Transactions on Medical Imaging',
            year: 2024,
            doi: '10.1109/TMI.2024.3156789',
            imageUrl: 'https://...',
            keywords: ['deep learning', 'healthcare'],
            citations: 342,
          },
        ],
        total: 1,
      },
    },
  })
  @Widget('research-hub')
  async searchPapers(
    input: {
      query: string;
      limit?: number;
      year?: number;
      minCitations?: number;
    },
    ctx: ExecutionContext
  ) {
    ctx.logger.info('Searching papers', { query: input.query, limit: input.limit });

    const limit = input.limit || 10;
    const queryLower = input.query.toLowerCase();

    // Filter papers based on query and optional filters
    let results = this.papers.filter((paper) => {
      const matchesQuery =
        paper.title.toLowerCase().includes(queryLower) ||
        paper.abstract.toLowerCase().includes(queryLower) ||
        paper.keywords.some((k) => k.toLowerCase().includes(queryLower)) ||
        paper.authors.some((a) => a.toLowerCase().includes(queryLower));

      const matchesYear = !input.year || paper.year === input.year;
      const matchesCitations = !input.minCitations || paper.citations >= input.minCitations;

      return matchesQuery && matchesYear && matchesCitations;
    });

    // Sort by citations (descending) for ranking
    results = results.sort((a, b) => b.citations - a.citations).slice(0, limit);

    return {
      query: input.query,
      results,
      total: results.length,
    };
  }

  @Tool({
    name: 'get-paper-details',
    description: 'Get full details of a specific paper including metadata, keywords, and related sources',
    inputSchema: z.object({
      paperId: z.string().describe('The ID of the paper to retrieve'),
    }),
    examples: {
      request: {
        paperId: 'paper_001',
      },
      response: {
        id: 'paper_001',
        title: 'Deep Learning Applications in Healthcare',
        authors: ['Sarah Chen', 'Michael Rodriguez', 'Emily Watson'],
        abstract: 'This paper surveys...',
        journal: 'IEEE Transactions on Medical Imaging',
        year: 2024,
        doi: '10.1109/TMI.2024.3156789',
        imageUrl: 'https://...',
        keywords: ['deep learning', 'healthcare', 'medical imaging'],
        citations: 342,
        relatedPapers: [
          {
            id: 'paper_002',
            title: 'Machine Learning for Predictive Healthcare',
            authors: ['James Liu'],
          },
        ],
      },
    },
  })
  async getPaperDetails(
    input: { paperId: string },
    ctx: ExecutionContext
  ) {
    ctx.logger.info('Getting paper details', { paperId: input.paperId });

    const paper = this.papers.find((p) => p.id === input.paperId);

    if (!paper) {
      throw new Error(`Paper with ID ${input.paperId} not found`);
    }

    // Find related papers (papers with overlapping keywords)
    const relatedPapers = this.papers
      .filter((p) => p.id !== paper.id)
      .filter((p) => {
        const overlap = p.keywords.filter((k) => paper.keywords.includes(k));
        return overlap.length > 0;
      })
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        title: p.title,
        authors: p.authors,
      }));

    return {
      ...paper,
      relatedPapers,
    };
  }
}
