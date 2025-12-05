'use client';

import { useEffect, useRef, useState } from 'react';
import { Trail, getCrowdLevel, getCrowdLevelColor } from '@/lib/types';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';

// Trail coordinates for Mudeungsan National Park (approximate real locations)
const TRAIL_COORDINATES: Record<string, { lat: number; lng: number; elevation: string }> = {
  seoseokdae: { lat: 35.1348, lng: 126.9885, elevation: '1,100m' },
  ipseokdae: { lat: 35.1355, lng: 126.9910, elevation: '1,017m' },
  jungbong: { lat: 35.1340, lng: 126.9895, elevation: '1,187m' },
  wonhyo: { lat: 35.1280, lng: 126.9820, elevation: '520m' },
  jeungsim: { lat: 35.1250, lng: 126.9950, elevation: '350m' },
};

// Map center (Mudeungsan summit area)
const MAP_CENTER = { lat: 35.1300, lng: 126.9890 };
const DEFAULT_ZOOM = 13;

interface TrailMapProps {
  trails: Trail[];
  selectedTrail: Trail | null;
  onSelectTrail: (trail: Trail) => void;
}

export function TrailMap({ trails, selectedTrail, onSelectTrail }: TrailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import of Leaflet (client-side only)
    const initMap = async () => {
      if (typeof window === 'undefined' || !mapRef.current) return;
      if (mapInstanceRef.current) return; // Already initialized

      const L = (await import('leaflet')).default;

      // Initialize the map
      const map = L.map(mapRef.current, {
        center: [MAP_CENTER.lat, MAP_CENTER.lng],
        zoom: DEFAULT_ZOOM,
        zoomControl: true,
        attributionControl: true,
      });

      // Use OpenStreetMap tiles with terrain style
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
      }).addTo(map);

      // Create a layer group for markers
      markersRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
      setIsLoaded(true);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when trails data changes
  useEffect(() => {
    const updateMarkers = async () => {
      if (!mapInstanceRef.current || !markersRef.current || !isLoaded) return;

      const L = (await import('leaflet')).default;

      // Clear existing markers
      markersRef.current.clearLayers();

      // Add markers for each trail
      trails.forEach((trail) => {
        const coords = TRAIL_COORDINATES[trail.id];
        if (!coords) return;

        const level = getCrowdLevel(trail.currentCount, trail.capacity);
        const color = getCrowdLevelColor(level);
        const percentage = Math.round((trail.currentCount / trail.capacity) * 100);
        const isSelected = selectedTrail?.id === trail.id;

        // Create custom icon
        const iconSize = isSelected ? 50 : 40;
        const pulseClass = level === 'high' ? 'pulse-animation' : '';

        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="marker-container ${pulseClass}" style="width: ${iconSize}px; height: ${iconSize}px;">
              <div class="marker-circle" style="
                width: 100%;
                height: 100%;
                background: ${color};
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                ${isSelected ? 'transform: scale(1.1); box-shadow: 0 0 20px ' + color + ';' : ''}
              ">
                <span style="color: white; font-weight: bold; font-size: ${isSelected ? '14px' : '12px'};">${percentage}%</span>
              </div>
              <div class="marker-label" style="
                position: absolute;
                top: -28px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 4px 10px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                white-space: nowrap;
                font-size: 12px;
                font-weight: 600;
                color: #374151;
                border: 1px solid ${color};
              ">
                ${trail.shortName}
              </div>
            </div>
          `,
          iconSize: [iconSize, iconSize + 28],
          iconAnchor: [iconSize / 2, iconSize],
        });

        const marker = L.marker([coords.lat, coords.lng], { icon: customIcon });

        // Add popup with trail info
        marker.bindPopup(`
          <div style="min-width: 180px; font-family: system-ui, sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1f2937; border-bottom: 2px solid ${color}; padding-bottom: 8px;">
              ${trail.name}
            </h3>
            <div style="display: grid; gap: 6px; font-size: 13px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">현재 탐방객</span>
                <span style="font-weight: 600; color: ${color};">${trail.currentCount.toLocaleString()}명</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">수용 인원</span>
                <span style="font-weight: 600;">${trail.capacity.toLocaleString()}명</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">해발고도</span>
                <span style="font-weight: 600;">${coords.elevation}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">코스 거리</span>
                <span style="font-weight: 600;">${trail.distance}</span>
              </div>
            </div>
            <div style="
              margin-top: 10px;
              padding: 8px;
              border-radius: 8px;
              background: ${level === 'low' ? '#dcfce7' : level === 'medium' ? '#fef3c7' : '#fee2e2'};
              color: ${level === 'low' ? '#166534' : level === 'medium' ? '#92400e' : '#991b1b'};
              font-size: 12px;
              text-align: center;
            ">
              ${level === 'low' ? '여유로움 - 방문 권장!' : level === 'medium' ? '보통 - 1-2시간 후 재확인' : '혼잡 - 다른 코스 추천'}
            </div>
          </div>
        `, {
          closeButton: true,
          className: 'custom-popup',
        });

        marker.on('click', () => {
          onSelectTrail(trail);
        });

        markersRef.current?.addLayer(marker);
      });

      // If a trail is selected, pan to it
      if (selectedTrail) {
        const coords = TRAIL_COORDINATES[selectedTrail.id];
        if (coords) {
          mapInstanceRef.current?.setView([coords.lat, coords.lng], 14, {
            animate: true,
            duration: 0.5,
          });
        }
      }
    };

    updateMarkers();
  }, [trails, selectedTrail, onSelectTrail, isLoaded]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {/* Map container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-green-100 to-green-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-green-600 font-medium">지도 로딩 중...</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
        <p className="text-xs font-semibold text-gray-700 mb-2">혼잡도</p>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
            <span className="text-xs text-gray-600">여유</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
            <span className="text-xs text-gray-600">보통</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
            <span className="text-xs text-gray-600">혼잡</span>
          </div>
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2 z-[1000]">
        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
        <span className="text-sm font-semibold text-gray-700">LIVE</span>
      </div>

      {/* Custom styles for markers */}
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .marker-container {
          position: relative;
        }
        .pulse-animation .marker-circle {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.6), 0 4px 12px rgba(0,0,0,0.3);
          }
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
        }
        .custom-popup .leaflet-popup-content {
          margin: 12px;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #374151 !important;
          border: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f3f4f6 !important;
        }
      `}</style>
    </div>
  );
}
