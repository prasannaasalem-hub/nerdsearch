import { ToolDecorator as Tool, Widget, z, ExecutionContext, Injectable } from '@nitrostack/core';

@Injectable()
export class LearningTools {
  @Tool({
    name: 'get-learning-roadmap',
    title: 'Get learning roadmap',
    description: 'Generate a learning roadmap for a given subject or technology.',
    inputSchema: z.object({
      topic: z.string().describe('The topic or technology to learn'),
      level: z.string().optional().describe('Target experience level, e.g. beginner, intermediate'),
    }),
    examples: {
      request: { topic: 'machine learning', level: 'beginner' },
      response: { roadmap: [] }
    }
  })
  @Widget('learning-hub')
  async getLearningRoadmap(input: { topic: string; level?: string }, ctx: ExecutionContext) {
    ctx.logger.info('Getting learning roadmap', { topic: input.topic, level: input.level });

    return {
      topic: input.topic,
      level: input.level || 'beginner',
      roadmap: [
        { step: 1, title: 'Understand core concepts', description: `Learn the fundamentals of ${input.topic}.` },
        { step: 2, title: 'Practice with examples', description: 'Build small projects to reinforce learning.' },
        { step: 3, title: 'Read documentation', description: 'Explore official docs and guides.' }
      ]
    };
  }
}
