'use client';

import { useContext } from 'react';
import { GeoContext } from '@/context/geo-context';

export const useGeoStore = () => {
    const context = useContext(GeoContext);
    if (context === undefined) {
        throw new Error('useGeoStore must be used within a GeoProvider');
    }
    return context;
};
