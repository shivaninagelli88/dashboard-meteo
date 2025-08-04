import { ColorRule } from "./types";

export const DEFAULT_RULES: ColorRule[] = [
    { id: '1', max: 0, color: '#0000FF' }, // Blue for < 0
    { id: '2', min: 0, max: 15, color: '#00FFFF' }, // Cyan for 0-15
    { id: '3', min: 15, max: 25, color: '#00FF00' }, // Green for 15-25
    { id: '4', min: 25, max: 35, color: '#FFFF00' }, // Yellow for 25-35
    { id: '5', min: 35, color: '#FF0000' }, // Red for > 35
];
