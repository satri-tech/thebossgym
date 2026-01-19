'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ContactMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
}

type MapTheme = 'carto' | 'default' | 'satellite';

const ContactMap = ({ 
  latitude = 28.2096, 
  longitude = 83.9856, 
  zoom = 17 
}: ContactMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [currentTheme, setCurrentTheme] = useState<MapTheme>('carto');

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Handle Ctrl+scroll for zoom
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -1 : 1;
        map.setZoom(map.getZoom() + delta);
      }
    };

    mapRef.current.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup wheel listener
    const cleanup = () => {
      if (mapRef.current) {
        mapRef.current.removeEventListener('wheel', handleWheel);
      }
    };

    // Add initial tile layer
    const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);
    
    tileLayerRef.current = tileLayer;

    // Create marker with gold icon (for carto theme)
    const marker = L.marker([latitude, longitude], { icon: createMarkerIcon('carto') }).addTo(map);
    markerRef.current = marker;

    // Add compact popup with the expanded map component
    marker.bindPopup(`
      <div style="
        background: hsl(0 0% 10%);
        color: #ffffff;
        font-family: system-ui, -apple-system, sans-serif;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
        min-width: 240px;
      ">
        <!-- Compact Map visualization -->
        <div style="position: relative; width: 240px; height: 140px; background: hsl(0 0% 15%);">
          <!-- Gradient overlay -->
          <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.08) 100%);"></div>
          
          <!-- Roads -->
          <svg style="position: absolute; inset: 0; width: 100%; height: 100%;" preserveAspectRatio="none">
            <line x1="0%" y1="35%" x2="100%" y2="35%" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>
            <line x1="0%" y1="65%" x2="100%" y2="65%" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>
            <line x1="30%" y1="0%" x2="30%" y2="100%" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
            <line x1="70%" y1="0%" x2="70%" y2="100%" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
            <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
            <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
            <line x1="15%" y1="0%" x2="15%" y2="100%" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
            <line x1="85%" y1="0%" x2="85%" y2="100%" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          </svg>
          
          <!-- Buildings -->
          <div style="position: absolute; top: 40%; left: 10%; width: 15%; height: 20%; border-radius: 1px; background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.15);"></div>
          <div style="position: absolute; top: 15%; left: 35%; width: 12%; height: 15%; border-radius: 1px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.12);"></div>
          <div style="position: absolute; top: 70%; left: 75%; width: 18%; height: 18%; border-radius: 1px; background: rgba(255,255,255,0.22); border: 1px solid rgba(255,255,255,0.14);"></div>
          <div style="position: absolute; top: 20%; right: 10%; width: 10%; height: 25%; border-radius: 1px; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.12);"></div>
          
          <!-- Location marker -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.8));">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#d4af37"/>
              <circle cx="12" cy="9" r="2.5" fill="#000"/>
            </svg>
          </div>
          
          <!-- Gradient overlay bottom -->
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, hsl(0 0% 10%) 0%, transparent 40%, transparent 100%); opacity: 0.6;"></div>
        </div>
        
        <!-- Content section -->
        <div style="padding: 12px 16px;">
          <div style="margin-bottom: 10px;">
            <p style="font-size: 15px; color: #d4af37; margin: 0 0 4px 0; font-weight: 700;">The Boss Gym</p>
            <p style="font-size: 13px; color: #ffffff; margin: 0 0 2px 0; font-weight: 500;">Prithivi Chowk</p>
            <p style="font-size: 11px; color: #9ca3af; margin: 0;">Pokhara, Nepal</p>
          </div>
          
          <a href="https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}" 
             target="_blank"
             rel="noopener noreferrer"
             style="
               display: inline-block;
               padding: 6px 14px;
               background: linear-gradient(135deg, #f7e7a1 0%, #d4af37 25%, #bfa133 50%, #ffd700 75%, #c9a227 100%);
               color: #000;
               text-decoration: none;
               border-radius: 4px;
               font-size: 11px;
               font-weight: 600;
               text-transform: uppercase;
               letter-spacing: 0.3px;
               transition: all 0.3s ease;
             "
             onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 12px rgba(212, 175, 55, 0.5)';"
             onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';"
          >
            Get Directions
          </a>
        </div>
      </div>
    `, {
      closeButton: true,
      className: 'custom-popup',
      maxWidth: 240,
      minWidth: 240,
    });

    // Cleanup
    return () => {
      cleanup();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom]);

  // Create marker icon based on theme
  const createMarkerIcon = (theme: MapTheme) => {
    let color: string;
    let shadowColor: string;
    
    switch (theme) {
      case 'carto':
        color = '#d4af37'; // Gold for dark theme
        shadowColor = 'rgba(212, 175, 55, 0.8)';
        break;
      case 'default':
        color = '#000000'; // Black for light theme
        shadowColor = 'rgba(0, 0, 0, 0.6)';
        break;
      case 'satellite':
        color = '#ffffff'; // Black for satellite
        shadowColor = 'rgba(255, 255, 255, 1)';
        break;
    }
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="position: relative;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 10px ${shadowColor});">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${color}"/>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  // Handle theme change
  const changeTheme = (theme: MapTheme) => {
    if (!mapInstanceRef.current || !tileLayerRef.current || !markerRef.current) return;
    
    // Remove current tile layer
    tileLayerRef.current.remove();
    
    // Add new tile layer based on theme
    let newTileLayer: L.TileLayer;
    
    switch (theme) {
      case 'carto':
        newTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        });
        break;
      case 'default':
        newTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 20,
        });
        break;
      case 'satellite':
        newTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 20,
          maxNativeZoom: 18,
        });
        break;
    }
    
    newTileLayer.addTo(mapInstanceRef.current);
    tileLayerRef.current = newTileLayer;
    
    // Update marker icon to match theme
    markerRef.current.setIcon(createMarkerIcon(theme));
    
    setCurrentTheme(theme);
  };

  return (
    <div className="relative w-full h-full">
      {/* Theme switcher buttons */}
      <div className="absolute top-4 right-4 z-1000 flex gap-2">
        <button
          onClick={() => changeTheme('carto')}
          className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            currentTheme === 'carto'
              ? 'bg-[#d4af37] text-black shadow-lg'
              : 'bg-black/70 text-white hover:bg-black/90'
          }`}
          title="Carto Dark Theme"
        >
          Dark
        </button>
        <button
          onClick={() => changeTheme('default')}
          className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            currentTheme === 'default'
              ? 'bg-[#d4af37] text-black shadow-lg'
              : 'bg-black/70 text-white hover:bg-black/90'
          }`}
          title="OpenStreetMap Default Theme"
        >
          Default
        </button>
        <button
          onClick={() => changeTheme('satellite')}
          className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
            currentTheme === 'satellite'
              ? 'bg-[#d4af37] text-black shadow-lg'
              : 'bg-black/70 text-white hover:bg-black/90'
          }`}
          title="Satellite View"
        >
          Satellite
        </button>
      </div>

      {/* Ctrl+Scroll hint */}
      <div className="absolute bottom-4 left-4 z-1000 bg-black/70 text-white text-xs px-3 py-2 rounded-md pointer-events-none">
        <span className="font-semibold">Ctrl</span> + Scroll to zoom
      </div>

      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 8px !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .leaflet-popup-tip {
          background: hsl(0 0% 10%) !important;
          border: none !important;
        }
        .custom-popup .leaflet-popup-close-button {
          position: absolute !important;
          z-index: 1000 !important;
          color: #d4af37 !important;
          font-size: 20px !important;
          font-weight: 700 !important;
          padding: 0 !important;
          right: 10px !important;
          top: 10px !important;
          width: 28px !important;
          height: 28px !important;
          line-height: 28px !important;
          text-align: center !important;
          background: rgba(0, 0, 0, 0.7) !important;
          border-radius: 4px !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
          pointer-events: auto !important;
        }
        .custom-popup .leaflet-popup-close-button:hover {
          color: #ffd700 !important;
          background: rgba(0, 0, 0, 0.9) !important;
          transform: scale(1.1) !important;
        }
        .custom-popup .leaflet-popup-close-button span {
          display: block !important;
          line-height: 28px !important;
        }
      `}</style>
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ background: '#1a1a1a' }}
      />
    </div>
  );
};

export default ContactMap;
