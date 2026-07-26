import { Module } from '@nitrostack/core';
import { HardwareTools } from './hardware.tools.js';

@Module({
  name: 'hardware',
  description: 'Hardware module for ESP32, Arduino, Raspberry Pi, sensors, and cost estimation.',
  controllers: [HardwareTools],
})
export class HardwareModule {}
