import { ExecutionContext } from '@nitrostack/core';
/**
 * Organize Tools
 *
 * Tools for managing research collections
 */
export declare class OrganizeTools {
    private collections;
    private collectionsPath;
    constructor();
    private loadCollections;
    private saveCollections;
    saveToCollection(input: {
        paperId: string;
        collectionName: string;
    }, ctx: ExecutionContext): Promise<{
        success: boolean;
        message: string;
        collectionId: string;
        collectionName: string;
        paperCount: number;
    }>;
    listCollections(input: {
        filter?: string;
    }, ctx: ExecutionContext): Promise<{
        collections: {
            id: string;
            name: string;
            description: string;
            imageUrl: string;
            paperCount: number;
            tags: string[];
        }[];
        total: number;
    }>;
}
//# sourceMappingURL=organize.tools.d.ts.map