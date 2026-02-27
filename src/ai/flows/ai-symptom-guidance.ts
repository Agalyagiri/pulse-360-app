'use server';
/**
 * @fileOverview An AI Symptom Assistant that provides health guidance and recommends doctor consultations based on user-provided symptoms.
 *
 * - aiSymptomGuidance - A function that handles the symptom analysis and guidance process.
 * - AiSymptomGuidanceInput - The input type for the aiSymptomGuidance function.
 * - AiSymptomGuidanceOutput - The return type for the aiSymptomGuidance function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiSymptomGuidanceInputSchema = z.object({
  symptoms: z.string().describe('A detailed description of the user\'s symptoms.'),
});
export type AiSymptomGuidanceInput = z.infer<typeof AiSymptomGuidanceInputSchema>;

const AiSymptomGuidanceOutputSchema = z.object({
  guidance: z.string().describe('Personalized health guidance based on the provided symptoms.'),
  consultationNeeded: z.boolean().describe('True if a doctor\'s consultation is recommended, false otherwise.'),
  recommendationReason: z.string().describe('The reason for recommending a doctor\'s consultation, if consultationNeeded is true. Otherwise, an empty string.'),
});
export type AiSymptomGuidanceOutput = z.infer<typeof AiSymptomGuidanceOutputSchema>;

export async function aiSymptomGuidance(input: AiSymptomGuidanceInput): Promise<AiSymptomGuidanceOutput> {
  return aiSymptomGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomGuidancePrompt',
  input: { schema: AiSymptomGuidanceInputSchema },
  output: { schema: AiSymptomGuidanceOutputSchema },
  prompt: `You are a professional AI health assistant. Your goal is to provide helpful, personalized health guidance based on a user's described symptoms. You should also recommend whether a doctor's consultation is needed and provide a reason if so.

Based on the following symptoms, provide guidance and a recommendation:

Symptoms: {{{symptoms}}}

Keep in mind that you are an AI assistant and cannot provide medical diagnoses. Always advise the user to seek professional medical advice if they are concerned about their health.`,
});

const aiSymptomGuidanceFlow = ai.defineFlow(
  {
    name: 'aiSymptomGuidanceFlow',
    inputSchema: AiSymptomGuidanceInputSchema,
    outputSchema: AiSymptomGuidanceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
