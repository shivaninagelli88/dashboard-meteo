'use server';

/**
 * @fileOverview This file contains the Genkit flow for the InitialZoomAdvisor feature.
 *
 * - suggestInitialZoom - A function that suggests an initial zoom level for a given polygon.
 * - InitialZoomAdvisorInput - The input type for the suggestInitialZoom function, including polygon coordinates and screen dimensions.
 * - InitialZoomAdvisorOutput - The return type for the suggestInitialZoom function, providing the suggested zoom level.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InitialZoomAdvisorInputSchema = z.object({
  polygonCoordinates: z
    .array(z.array(z.number()).length(2))
    .describe("An array of lat/lon coordinate pairs representing the polygon's vertices."),
  screenWidthPixels: z.number().describe('The width of the screen in pixels.'),
  screenHeightPixels: z.number().describe('The height of the screen in pixels.'),
});
export type InitialZoomAdvisorInput = z.infer<typeof InitialZoomAdvisorInputSchema>;

const InitialZoomAdvisorOutputSchema = z.object({
  suggestedZoomLevel: z
    .number()
    .describe('The suggested zoom level for the map, so that the polygon occupies approximately 1/8 of the screen area.'),
});
export type InitialZoomAdvisorOutput = z.infer<typeof InitialZoomAdvisorOutputSchema>;

export async function suggestInitialZoom(input: InitialZoomAdvisorInput): Promise<InitialZoomAdvisorOutput> {
  return initialZoomAdvisorFlow(input);
}

const initialZoomAdvisorPrompt = ai.definePrompt({
  name: 'initialZoomAdvisorPrompt',
  input: {schema: InitialZoomAdvisorInputSchema},
  output: {schema: InitialZoomAdvisorOutputSchema},
  prompt: `You are a geospatial analysis expert, skilled at determining optimal map zoom levels.
Given a polygon defined by its GPS coordinates and the dimensions of the screen in pixels,
you will suggest an initial zoom level such that the polygon occupies approximately 1/8 of the screen area.

Polygon Coordinates (lat/lon):
{{#each polygonCoordinates}}
  - {{this.[0]}}, {{this.[1]}}
{{/each}}

Screen Width: {{screenWidthPixels}} pixels
Screen Height: {{screenHeightPixels}} pixels

Consider these factors to estimate an appropriate zoom level:
- The geographic size and shape of the polygon.
- The desired screen coverage (approximately 1/8 of the screen).
- The relationship between zoom level and the display scale in map units.

Provide only the zoom level as a floating-point number. Do not include any other explanation.
Ensure the zoom level is reasonable; avoid extreme values.
`,
});

const initialZoomAdvisorFlow = ai.defineFlow(
  {
    name: 'initialZoomAdvisorFlow',
    inputSchema: InitialZoomAdvisorInputSchema,
    outputSchema: InitialZoomAdvisorOutputSchema,
  },
  async input => {
    const {output} = await initialZoomAdvisorPrompt(input);
    return output!;
  }
);
