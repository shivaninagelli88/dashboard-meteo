'use client';

import React, { useMemo } from 'react';
import { useGeoStore } from '@/hooks/use-geo-store';
import { Slider } from './ui/slider';
import { Card, CardContent } from './ui/card';
import { addHours, format, subDays, addDays } from 'date-fns';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const TOTAL_HOURS = 30 * 24; // 15 days before, 15 days after

export default function TimelineSlider() {
  const { state, dispatch } = useGeoStore();

  const now = useMemo(() => new Date(), []);
  const startDate = useMemo(() => subDays(now, 15), [now]);

  const handleSliderChange = (value: number[]) => {
    const newStartHour = value[0];
    const newEndHour = state.isRange ? value[1] : value[0] + 1;

    const newStartDate = addHours(startDate, newStartHour);
    const newEndDate = addHours(startDate, newEndHour);
    
    dispatch({ type: 'SET_TIMELINE', payload: { start: newStartDate, end: newEndDate } });
  };
  
  const toggleIsRange = (checked: boolean) => {
    dispatch({ type: 'TOGGLE_IS_RANGE', payload: checked });
    // When switching, reset slider to a single point or default range
    const currentStartHour = Math.round((state.timeline.start.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    if (checked) {
      handleSliderChange([currentStartHour, currentStartHour + 24]);
    } else {
      handleSliderChange([currentStartHour]);
    }
  };

  const value = useMemo(() => {
    const startHour = Math.round((state.timeline.start.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    const endHour = Math.round((state.timeline.end.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    return state.isRange ? [startHour, endHour] : [startHour];
  }, [state.timeline, startDate, state.isRange]);
  
  const displayFormat = 'MMM d, yyyy HH:mm';
  const displayDate = state.isRange
    ? `${format(state.timeline.start, displayFormat)} - ${format(state.timeline.end, displayFormat)}`
    : format(state.timeline.start, displayFormat);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
      <Card className="bg-card/90 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Switch id="range-mode" checked={state.isRange} onCheckedChange={toggleIsRange} />
              <Label htmlFor="range-mode">Time Range</Label>
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <Slider
                min={0}
                max={TOTAL_HOURS}
                step={1}
                value={value}
                onValueChange={handleSliderChange}
              />
            </div>
            <div className="text-center sm:text-right text-sm text-muted-foreground w-full sm:w-auto min-w-[280px]">
              {displayDate}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
