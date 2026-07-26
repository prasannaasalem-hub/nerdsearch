import { ToolDecorator as Tool, Widget, ExecutionContext, z, Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CalculatorTools {
  @Tool({
    name: 'calculate',
    description: 'Perform basic arithmetic calculations',
    inputSchema: z.object({
      operation: z.enum(['add', 'subtract', 'multiply', 'divide']).describe('The operation to perform'),
      a: z.number().describe('First number'),
      b: z.number().describe('Second number')
    }),
    examples: {
      request: {
        operation: 'add',
        a: 5,
        b: 3
      },
      response: {
        operation: 'add',
        a: 5,
        b: 3,
        result: 8,
        expression: '5 + 3 = 8'
      }
    }
  })
  @Widget('calculator-result')
  async calculate(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Performing calculation', {
      operation: input.operation,
      a: input.a,
      b: input.b
    });

    let result: number;
    let symbol: string;

    switch (input.operation) {
      case 'add':
        result = input.a + input.b;
        symbol = '+';
        break;
      case 'subtract':
        result = input.a - input.b;
        symbol = '-';
        break;
      case 'multiply':
        result = input.a * input.b;
        symbol = '×';
        break;
      case 'divide':
        if (input.b === 0) {
          throw new Error('Cannot divide by zero');
        }
        result = input.a / input.b;
        symbol = '÷';
        break;
      default:
        throw new Error('Invalid operation');
    }

    return {
      operation: input.operation,
      a: input.a,
      b: input.b,
      result,
      expression: `${input.a} ${symbol} ${input.b} = ${result}`
    };
  }

  @Tool({
    name: 'convert_temperature',
    description: 'Convert temperature units based on file content or direct input. Supports Celsius (C) and Fahrenheit (F).',
    inputSchema: z.object({
      file_name: z.string().optional().describe('Name of the uploaded file (optional; omit for direct value conversion)'),
      file_type: z.string().optional().describe('MIME type of the uploaded file (optional; omit for direct value conversion)'),
      file_content: z.string().optional().describe('Base64 encoded file content. Will be injected by system if a file is uploaded.'),
      value: z.number().optional().describe('Temperature value to convert'),
      from_unit: z.enum(['C', 'F']).optional().describe('Unit to convert from (C or F)'),
      to_unit: z.enum(['C', 'F']).optional().describe('Unit to convert to (C or F)')
    })
  })
  async convertTemperature(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Processing temperature conversion', {
      name: input.file_name,
      type: input.file_type,
      value: input.value,
      from: input.from_unit,
      to: input.to_unit
    });

    const hasFile = Boolean(input.file_name && input.file_content);
    let fileStats: { name: string; type: string; saved_path: string; status: string } | null = null;

    if (hasFile) {
      // Save file to uploads directory
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, input.file_name);

      // Decode base64
      try {
        const matches = input.file_content.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let buffer;

        if (matches && matches.length === 3) {
          buffer = Buffer.from(matches[2], 'base64');
        } else {
          buffer = Buffer.from(input.file_content, 'base64');
        }

        fs.writeFileSync(filePath, buffer);
        ctx.logger.info(`Saved file to ${filePath}`);

        fileStats = {
          name: input.file_name,
          type: input.file_type ?? 'application/octet-stream',
          saved_path: filePath,
          status: 'saved'
        };
      } catch (e) {
        ctx.logger.error('Failed to save file', { error: e instanceof Error ? e.message : String(e) });
        fileStats = {
          name: input.file_name,
          type: input.file_type ?? 'application/octet-stream',
          saved_path: filePath,
          status: 'failed'
        };
      }
    }

    let result: number | null = null;
    let message = hasFile
      ? `Successfully processed and saved file ${input.file_name}`
      : 'Processing direct temperature conversion (no file provided)';

    // Perform conversion logic
    if (input.value !== undefined && input.from_unit && input.to_unit) {
      try {
        message += `. Converting ${input.value}°${input.from_unit} to ${input.to_unit}`;

        if (input.from_unit === input.to_unit) {
          result = input.value;
        } else if (input.from_unit === 'C' && input.to_unit === 'F') {
          result = (input.value * 9 / 5) + 32;
        } else if (input.from_unit === 'F' && input.to_unit === 'C') {
          result = (input.value - 32) * 5 / 9;
        } else {
          throw new Error('Unsupported unit conversion');
        }

        // Round to 2 decimal places
        if (result !== null) {
          result = Math.round(result * 100) / 100;
          message += `. Result: ${result}°${input.to_unit}`;
        }
      } catch (e: any) {
        message += `. Conversion failed: ${e.message}`;
      }
    } else {
      message += `. No valid conversion parameters detected from manual input or file extraction.`;
    }

    return {
      status: 'success',
      message,
      file_info: fileStats,
      conversion_result: result !== null ? { value: result, unit: input.to_unit } : null,
      original_value: input.value !== undefined ? { value: input.value, unit: input.from_unit } : null
    };
  }
}

