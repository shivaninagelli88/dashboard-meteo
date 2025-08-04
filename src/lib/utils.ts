import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Point } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateCentroid(path: Point[]): Point {
  if (path.length === 0) {
    return { lat: 0, lng: 0 };
  }
  const { lat, lng } = path.reduce(
    (acc, point) => ({
      lat: acc.lat + point.lat,
      lng: acc.lng + point.lng,
    }),
    { lat: 0, lng: 0 }
  );
  return {
    lat: lat / path.length,
    lng: lng / path.length,
  };
}
