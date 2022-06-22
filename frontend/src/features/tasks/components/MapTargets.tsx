import {
  SwitchVerticalIcon,
  LocationMarkerIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline';
import React from 'react';

type IconProps = {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  activate: boolean;
};

const MapIcon: React.VFC<IconProps> = (props: IconProps) => {
  return (
    <div className="flex justify-items-center items-center w-8 h-8 bg-gray-200 rounded-full">
      <props.icon
        className={`flex-1 w-6 h-6 ${props.activate ? 'text-red-500' : 'text-gray-400'}`}
      />
    </div>
  );
};

export type MapTargetsProps = {
  targets: ('road' | 'poi' | 'map')[];
};

export const MapTargets: React.VFC<MapTargetsProps> = ({ targets }) => {
  const activateRoad = targets.includes('road');
  const activatePoi = targets.includes('poi');
  const activateMap = targets.includes('map');

  return (
    <div className="flex space-x-2">
      <MapIcon icon={SwitchVerticalIcon} activate={activateRoad} />
      <MapIcon icon={LocationMarkerIcon} activate={activatePoi} />
      <MapIcon icon={OfficeBuildingIcon} activate={activateMap} />
    </div>
  );
};
