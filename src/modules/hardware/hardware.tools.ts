import { ToolDecorator as Tool, Widget, z, ExecutionContext, Injectable } from '@nitrostack/core';

@Injectable()
export class HardwareTools {
  @Tool({
    name: 'get-hardware-recommendations',
    title: 'Get hardware recommendations',
    description: 'Suggest hardware components like ESP32, Arduino, Raspberry Pi, and sensors for a project.',
    inputSchema: z.object({
      projectType: z.string().describe('The type of project or application'),
      budget: z.string().optional().describe('Optional budget range'),
    }),
    examples: {
      request: { projectType: 'robotics', budget: 'low' },
      response: { recommendations: [] }
    }
  })
  @Widget('hardware-hub')
  async getHardwareRecommendations(input: { projectType: string; budget?: string }, ctx: ExecutionContext) {
    ctx.logger.info('Getting hardware recommendations', { projectType: input.projectType, budget: input.budget });

    return {
      projectType: input.projectType,
      budget: input.budget || 'moderate',
      recommendations: [
        {
          component: 'ESP32',
          useCase: 'Wireless control and sensor integration',
          notes: 'Good for IoT and robotics projects with Wi-Fi/Bluetooth needs.',
        },
        {
          component: 'Raspberry Pi',
          useCase: 'Higher compute and multimedia support',
          notes: 'Best for more advanced projects and computer vision.',
        }
      ]
    };
  }
}
