import { LatLng } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  zoom: number;
  center: number[]; // [lon, lat]
  data?: number[][][];
  className?: string;
};

const convertToLatLng = (coordinates: number[][][]) => {
  return coordinates[0].map((val) => new LatLng(val[1], val[0]));
};

export const Map: React.FC<MapProps> = ({ zoom, center, data = [], className }: MapProps) => {
  const position = new LatLng(center[0], center[1]);

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
