'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, PolygonF, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useGeoStore } from '@/context/geo-context';
import { calculateCentroid } from '@/lib/utils';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const MapViewContent = () => {
    const { state, dispatch } = useGeoStore();
    const [activeMarker, setActiveMarker] = useState<string | null>(null);
    const map = useMap();

    useEffect(() => {
      if(map && state.polygons.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        state.polygons.forEach(p => {
          p.path.forEach(point => {
            bounds.extend(new google.maps.LatLng(point.lat, point.lng));
          })
        })
        map.fitBounds(bounds, 100);
      }
    }, [map, state.polygons])


    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (!state.isDrawing || !e.latLng) return;
        const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        
        if(state.currentPolygonPoints.length >= 12) {
          // auto-finish or notify user
          return;
        }
        dispatch({ type: 'ADD_POINT_TO_CURRENT_POLYGON', payload: point });
    };

    const handlePolygonEdit = useCallback((id: string, newPath: google.maps.MVCArray<google.maps.LatLng>) => {
        const path = newPath.getArray().map(p => ({ lat: p.lat(), lng: p.lng() }));
        const centroid = calculateCentroid(path);
        dispatch({ type: 'UPDATE_POLYGON_PATH', payload: { id, path, centroid } });
    }, [dispatch]);

    return (
        <Map
            defaultCenter={{ lat: 51.5074, lng: -0.1278 }}
            defaultZoom={3}
            zoom={state.mapZoom}
            mapId="geoweather_map"
            onClick={handleMapClick}
            disableDefaultUI={true}
            zoomControl={false}
            scrollwheel={false}
            gestureHandling="cooperative"
            className="w-full h-full border-none"
        >
            {state.polygons.map((polygon) => (
                <PolygonF
                    key={polygon.id}
                    paths={polygon.path}
                    options={{
                        fillColor: polygon.color,
                        strokeColor: '#1E90FF',
                        strokeWeight: 2,
                        fillOpacity: 0.6,
                        editable: true,
                        draggable: true,
                    }}
                    onMouseUp={e => {
                      const newPath = (e.target as google.maps.Polygon).getPath();
                      handlePolygonEdit(polygon.id, newPath);
                    }}
                    onClick={() => setActiveMarker(polygon.id)}
                />
            ))}

            {state.isDrawing && state.currentPolygonPoints.length > 0 && (
                <PolygonF
                    paths={state.currentPolygonPoints}
                    options={{
                        fillColor: '#87CEEB',
                        strokeColor: '#1E90FF',
                        strokeWeight: 2,
                        fillOpacity: 0.5,
                    }}
                />
            )}
            
            {state.polygons.map((p) => p.centroid && (
                <AdvancedMarker key={`marker-${p.id}`} position={p.centroid} onClick={() => setActiveMarker(p.id)} />
            ))}

            {activeMarker && state.polygons.find(p => p.id === activeMarker)?.centroid && (
                 <InfoWindow
                    position={state.polygons.find(p => p.id === activeMarker)!.centroid}
                    onCloseClick={() => setActiveMarker(null)}
                >
                    <div className="p-1">
                        <h4 className="font-bold">Polygon {state.polygons.findIndex(p => p.id === activeMarker) + 1}</h4>
                        <p>Avg. Temp: {state.polygons.find(p => p.id === activeMarker)?.averageTemperature?.toFixed(2) ?? 'N/A'} °C</p>
                    </div>
                </InfoWindow>
            )}

        </Map>
    );
};

export default function MapView() {
    if (!API_KEY) {
        return (
            <div className="flex items-center justify-center h-full w-full bg-muted">
                <p className="text-destructive text-center">
                    Google Maps API Key is missing.<br />
                    Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.
                </p>
            </div>
        );
    }
    return (
        <APIProvider apiKey={API_KEY}>
            <MapViewContent />
        </APIProvider>
    );
}
