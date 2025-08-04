'use client';

import React, { useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import MapView from '@/components/map-view';
import TimelineSlider from '@/components/timeline-slider';
import { GeoProvider } from '@/context/geo-context';
import { useGeoStore } from '@/hooks/use-geo-store';
import { ColorRule, PolygonData } from '@/lib/types';

const AppContainer = () => {
  const { state, dispatch } = useGeoStore();

  useEffect(() => {
    const fetchWeatherData = async (polygon: PolygonData) => {
      if (!polygon.centroid) return;

      const startDate = state.timeline.start.toISOString().split('T')[0];
      const endDate = state.timeline.end.toISOString().split('T')[0];
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${polygon.centroid.lat}&longitude=${polygon.centroid.lng}&hourly=temperature_2m&start_date=${startDate}&end_date=${endDate}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        const { time, temperature_2m } = data.hourly;
        const startIndex = time.findIndex((t: string) => new Date(t) >= state.timeline.start);
        const endIndex = time.findIndex((t: string) => new Date(t) > state.timeline.end);
        
        const relevantTemps = temperature_2m.slice(startIndex, endIndex === -1 ? undefined : endIndex);
        
        if (relevantTemps.length > 0) {
          const sum = relevantTemps.reduce((acc: number, temp: number) => acc + temp, 0);
          const averageTemperature = sum / relevantTemps.length;
          
          const getColorForTemperature = (temp: number, rules: ColorRule[]) => {
            const sortedRules = [...rules].sort((a, b) => (a.max ?? Infinity) - (b.max ?? Infinity));
            for (const rule of sortedRules) {
              const min = rule.min ?? -Infinity;
              const max = rule.max ?? Infinity;
              if (temp >= min && temp < max) {
                return rule.color;
              }
            }
            return '#808080'; // Default color
          };

          const color = getColorForTemperature(averageTemperature, state.rules);

          dispatch({
            type: 'UPDATE_POLYGON_DATA',
            payload: { id: polygon.id, averageTemperature, color },
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    state.polygons.forEach(polygon => {
      if (polygon.centroid) {
        fetchWeatherData(polygon);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.polygons, state.timeline, state.rules, dispatch]);


  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      <main className="flex flex-1 flex-col relative">
        <MapView />
        <TimelineSlider />
      </main>
    </div>
  );
};

export default function Home() {
  return (
    <GeoProvider>
      <AppContainer />
    </GeoProvider>
  );
}
