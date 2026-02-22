"use client";

import dynamic from "next/dynamic";

import "leaflet/dist/leaflet.css";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-gray-500 dark:text-gray-400">Loading map...</span>
    </div>
  ),
});

const MapWrapper = () => {
  return <Map />;
};

export default MapWrapper;
