import { MapIcon } from '@heroicons/react/outline';
import { LatLng } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  zoom: number;
  center: number[]; // [lat, lon]
  data?: number[][][];
  className?: string;
};

const convertToLatLng = (coordinates: number[][][]) => {
  return coordinates[0].map((val) => new LatLng(val[1], val[0]));
};

export const Map: React.FC<MapProps> = ({ zoom, center, data = [], className }: MapProps) => {
  if (data.length === 0 || center.length != 2) {
    return (
      <div className={`flex-col justify-center items-center border bg-gray-100 ${className}`}>
        <MapIcon className="p-1 w-12 h-12 text-gray-500 rounded-full" />
        <p className="text-gray-500">No Area</p>
      </div>
    );
  }

  const position = new LatLng(center[1], center[0]);

  return (
    <MapContainer className={`${className}`} center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={{ color: 'purple' }} positions={convertToLatLng(data)} />
    </MapContainer>
  );
};
