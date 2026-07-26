import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

/**
 * Organize Resources
 *
 * Reference metadata describing the collection organization feature.
 */
export class OrganizeResources {
  @Resource({
    uri: 'organize://example',
    name: 'Organize Example Resource',
    description: 'Example metadata describing how research collections are structured.',
    mimeType: 'application/json',
  })
  async exampleResource(uri: string, context: ExecutionContext) {
    return {
      type: 'text' as const,
      text: JSON.stringify(
        {
          example: {
            id: 'collection_example',
            name: 'Example Collection',
            description: 'A sample research collection',
            paperIds: [],
            tags: [],
          },
        },
        null,
        2
      ),
    };
  }
}
