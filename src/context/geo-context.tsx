'use client';

import React, { createContext, useReducer, Dispatch, ReactNode, useEffect } from 'react';
import type { PolygonData, ColorRule, GeoState, Action, Point } from '@/lib/types';
import { subDays, addDays } from 'date-fns';
import { DEFAULT_RULES } from '@/lib/constants';
import { calculateCentroid } from '@/lib/utils';


const getInitialState = (): GeoState => {
    if (typeof window !== 'undefined') {
        const storedState = localStorage.getItem('geoWeatherState');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            // Dates need to be re-hydrated from strings
            return {
                ...parsedState,
                timeline: {
                    start: new Date(parsedState.timeline.start),
                    end: new Date(parsedState.timeline.end),
                },
            };
        }
    }

    const now = new Date();
    return {
        polygons: [],
        rules: DEFAULT_RULES,
        timeline: {
            start: now,
            end: addDays(now, 1),
        },
        isDrawing: false,
        isRange: false,
        currentPolygonPoints: [],
        mapZoom: 3,
        center: { lat: 51.5074, lng: -0.1278 },
    };
};


const geoReducer = (state: GeoState, action: Action): GeoState => {
    switch (action.type) {
        case 'TOGGLE_DRAWING':
            return { ...state, isDrawing: !state.isDrawing, currentPolygonPoints: [] };
        case 'ADD_POINT_TO_CURRENT_POLYGON':
            return { ...state, currentPolygonPoints: [...state.currentPolygonPoints, action.payload] };
        case 'FINISH_DRAWING':
            if (state.currentPolygonPoints.length < 3) return state;
            const newPolygon: PolygonData = {
                id: new Date().toISOString(),
                path: state.currentPolygonPoints,
                centroid: calculateCentroid(state.currentPolygonPoints),
                color: '#808080',
                averageTemperature: null,
            };
            return {
                ...state,
                polygons: [...state.polygons, newPolygon],
                isDrawing: false,
                currentPolygonPoints: [],
            };
        case 'DELETE_POLYGON':
            return { ...state, polygons: state.polygons.filter(p => p.id !== action.payload) };
        case 'DELETE_ALL_POLYGONS':
            return { ...state, polygons: [] };
        case 'UPDATE_POLYGON_PATH': {
            return {
                ...state,
                polygons: state.polygons.map(p => p.id === action.payload.id ? { ...p, path: action.payload.path, centroid: action.payload.centroid } : p)
            };
        }
        case 'UPDATE_POLYGON_DATA': {
            return {
                ...state,
                polygons: state.polygons.map(p => p.id === action.payload.id ? { ...p, averageTemperature: action.payload.averageTemperature, color: action.payload.color } : p)
            }
        }
        case 'ADD_RULE':
            const newRule: ColorRule = { ...action.payload, id: new Date().toISOString() };
            return { ...state, rules: [...state.rules, newRule] };
        case 'DELETE_RULE':
            return { ...state, rules: state.rules.filter(r => r.id !== action.payload) };
        case 'SET_TIMELINE':
            return { ...state, timeline: action.payload };
        case 'TOGGLE_IS_RANGE':
            return { ...state, isRange: action.payload };
        case 'SET_MAP_ZOOM':
            return { ...state, mapZoom: action.payload };
        default:
            return state;
    }
};

export const GeoContext = createContext<{ state: GeoState; dispatch: Dispatch<Action> } | undefined>(undefined);

export const GeoProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(geoReducer, getInitialState());

    useEffect(() => {
        localStorage.setItem('geoWeatherState', JSON.stringify(state));
    }, [state]);

    return (
        <GeoContext.Provider value={{ state, dispatch }}>
            {children}
        </GeoContext.Provider>
    );
};
