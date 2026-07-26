var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, Widget, z, Injectable } from '@nitrostack/core';
let HardwareTools = class HardwareTools {
    async getHardwareRecommendations(input, ctx) {
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
};
__decorate([
    Tool({
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
    }),
    Widget('hardware-hub'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HardwareTools.prototype, "getHardwareRecommendations", null);
HardwareTools = __decorate([
    Injectable()
], HardwareTools);
export { HardwareTools };
//# sourceMappingURL=hardware.tools.js.map