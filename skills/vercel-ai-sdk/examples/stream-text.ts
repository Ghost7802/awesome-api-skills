import { streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    maxSteps: 5,
    tools: {
      weather: tool({
        description: 'Get the current weather in a given location',
        parameters: z.object({
          location: z.string().describe('The city and state, e.g. San Francisco, CA'),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72,
          condition: 'Sunny',
        }),
      }),
    },
  });

  return result.toDataStreamResponse();
}
