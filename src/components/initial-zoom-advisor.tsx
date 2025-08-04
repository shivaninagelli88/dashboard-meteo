'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { useGeoStore } from '@/hooks/use-geo-store';
import { suggestInitialZoom } from '@/ai/flows/initial-zoom-advisor';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function InitialZoomAdvisor() {
  const { dispatch } = useGeoStore();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestZoom = async () => {
    setIsLoading(true);
    try {
      // For demonstration, we use a predefined polygon (e.g., around a city like San Francisco)
      const demoPolygon = [
        [37.78, -122.45],
        [37.78, -122.40],
        [37.75, -122.40],
        [37.75, -122.45],
      ];

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const result = await suggestInitialZoom({
        polygonCoordinates: demoPolygon,
        screenWidthPixels: screenWidth,
        screenHeightPixels: screenHeight,
      });

      if (result.suggestedZoomLevel) {
        dispatch({ type: 'SET_MAP_ZOOM', payload: result.suggestedZoomLevel });
        toast({
          title: "Zoom Level Updated",
          description: `AI suggested zoom level: ${result.suggestedZoomLevel.toFixed(2)}`,
        });
      } else {
         throw new Error("AI did not return a zoom level.");
      }
    } catch (error) {
      console.error('Error suggesting initial zoom:', error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not get a zoom suggestion.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border-t">
      <h3 className="text-sm font-semibold mb-2 text-foreground/80">Map Settings</h3>
      <Button onClick={handleSuggestZoom} disabled={isLoading} className="w-full">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        AI Suggest Initial Zoom
      </Button>
    </div>
  );
}
