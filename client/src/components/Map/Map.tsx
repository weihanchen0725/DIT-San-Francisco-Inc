"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon with brand colors
const customIcon = new L.DivIcon({
  className: "custom-marker",
  html: `
    <div style="
      position: relative;
      width: 40px;
      height: 50px;
    ">
      <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.954 0 0 8.954 0 20c0 14.5 20 30 20 30s20-15.5 20-30C40 8.954 31.046 0 20 0z" fill="#F5A623"/>
        <circle cx="20" cy="18" r="8" fill="#0A1628"/>
        <circle cx="20" cy="18" r="4" fill="#F5A623"/>
      </svg>
    </div>
  `,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -45],
});

const Map = () => {
  // Fremont, CA coordinates
  const position: LatLngExpression = [37.47937797375581, -121.9444590947314];
  //
  const googleMapURL = "https://maps.app.goo.gl/Gmt7Y9h18K2Hk6xC8";

  return (
    <div className="relative rounded-b-2xl overflow-hidden">
      {/* Map overlay gradient for sleek look */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "280px", width: "100%" }}
        className="z-0"
      >
        {/* Using CartoDB Voyager for a cleaner, modern look */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="p-1">
              <h3 className="font-bold text-brand-navy text-base mb-1">
                DIT San Francisco Inc.
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                46750 Fremont Blvd #200
                <br />
                Fremont, CA 94538
              </p>
              <a
                href={googleMapURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-yellow hover:underline"
              >
                Get Directions
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/90 dark:bg-[#111127]/90 backdrop-blur-sm px-4 py-2 flex items-center justify-between border-t border-gray-200 dark:border-brand-navy-light">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Fremont, CA
          </span>
        </div>
        <a
          href={googleMapURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-brand-yellow hover:text-brand-yellow-hover transition-colors flex items-center gap-1"
        >
          Open in Maps
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Map;
