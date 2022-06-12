import { FullScreen, Zoom, ZoomSlider } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OLMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import React, { useEffect, useRef } from 'react';

import 'ol/ol.css';

export const Map: React.FC = () => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef) return;
    new OLMap({
      target: mapRef.current,
      view: new View({ projection: 'CRS:84', zoom: 16, center: [141.1378, 39.6987] }),
      layers: [new TileLayer({ source: new OSM() })],
      controls: [new FullScreen(), new Zoom(), new ZoomSlider()],
    });
  }, []);

  return (
    <div className="flex flex-col flex-1 h-(screen-map)">
      <div className="flex-1" ref={mapRef} />
    </div>
  );
};
