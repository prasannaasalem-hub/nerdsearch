import { ToolDecorator as Tool, Widget, z, ExecutionContext, Injectable } from '@nitrostack/core';

@Injectable()
export class ArchitectTools {
  @Tool({
    name: 'create-project-blueprint',
    title: 'Create project blueprint',
    description: 'Generate a high-level project blueprint combining research, datasets, GitHub, hardware, and learning plans.',
    inputSchema: z.object({
      projectName: z.string().describe('Project name'),
      domain: z.string().describe('Project domain or area of focus'),
    }),
    examples: {
      request: { projectName: 'Smart Garden', domain: 'IoT' },
      response: { blueprint: {} }
    }
  })
  @Widget('architect-hub')
  async createProjectBlueprint(input: { projectName: string; domain: string }, ctx: ExecutionContext) {
    ctx.logger.info('Creating project blueprint', { projectName: input.projectName, domain: input.domain });

    return {
      projectName: input.projectName,
      domain: input.domain,
      blueprint: {
        research: `Gather academic papers and domain research on ${input.domain}.`,
        datasets: `Find datasets relevant to ${input.domain}.`,
        github: `Study existing GitHub repos and starter projects for ${input.domain}.`,
        hardware: `Choose hardware suitable for ${input.domain} projects.`,
        learning: `Create a learning roadmap for ${input.domain}.`,
      }
    };
  }
}
