import { ExecutionContext } from '@nitrostack/core';
export declare class DatasetTools {
    searchDatasets(input: {
        query: string;
        source?: string;
        limit?: number;
    }, ctx: ExecutionContext): Promise<{
        query: string;
        source: string;
        results: {
            id: string;
            name: string;
            source: string;
            description: string;
            url: string;
            size: string;
            tags: string[];
        }[];
        total: number;
    }>;
}
//# sourceMappingURL=dataset.tools.d.ts.map