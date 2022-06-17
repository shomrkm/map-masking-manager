import { FullScreen, Zoom, ZoomSlider } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';

type MapProps = {
  zoom: number;
  center: number[]; // [lon, lat]
  className?: string;
};

export const Map: React.FC<MapProps> = ({ zoom, center, className }: MapProps) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef) return;
    new OLMap({
      target: mapRef.current,
      view: new View({ projection: 'CRS:84', zoom, center }),
      layers: [new TileLayer({ source: new OSM() })],
      controls: [new FullScreen(), new Zoom(), new ZoomSlider()],
    });
  }, [zoom, center]);

  return (
    <div className={`flex bg-no-repeat justify-center ${className}`}>
      <div className="flex-1" ref={mapRef} />
    </div>
  );
};
