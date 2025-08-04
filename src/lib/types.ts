export interface Point {
    lat: number;
    lng: number;
}

export interface PolygonData {
    id: string;
    path: Point[];
    centroid: Point;
    color: string;
    averageTemperature: number | null;
}

export interface ColorRule {
    id: string;
    min?: number;
    max?: number;
    color: string;
}

export interface Timeline {
    start: Date;
    end: Date;
}

export interface GeoState {
    polygons: PolygonData[];
    rules: ColorRule[];
    timeline: Timeline;
    isDrawing: boolean;
    isRange: boolean;
    currentPolygonPoints: Point[];
    mapZoom: number;
    center: Point;
}

export type Action =
    | { type: 'SET_INITIAL_STATE', payload: GeoState }
    | { type: 'TOGGLE_DRAWING' }
    | { type: 'ADD_POINT_TO_CURRENT_POLYGON'; payload: Point }
    | { type: 'FINISH_DRAWING' }
    | { type: 'DELETE_POLYGON'; payload: string }
    | { type: 'DELETE_ALL_POLYGONS' }
    | { type: 'UPDATE_POLYGON_PATH'; payload: { id: string; path: Point[], centroid: Point } }
    | { type: 'UPDATE_POLYGON_DATA'; payload: { id: string, averageTemperature: number, color: string } }
    | { type: 'ADD_RULE'; payload: Omit<ColorRule, 'id'> }
    | { type: 'DELETE_RULE'; payload: string }
    | { type: 'SET_TIMELINE'; payload: Timeline }
    | { type: 'TOGGLE_IS_RANGE', payload: boolean }
    | { type: 'SET_MAP_ZOOM', payload: number };