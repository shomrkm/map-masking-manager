import {
  SwitchVerticalIcon,
  LocationMarkerIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline';
import React from 'react';

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

type IconProps = {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  activate: boolean;
  size: keyof typeof sizes;
};

const MapIcon: React.VFC<IconProps> = ({ Icon, activate, size }) => {
  return (
    <div className="flex justify-items-center items-center p-2 bg-gray-200 rounded-full">
      <Icon className={`flex-1 ${sizes[size]} ${activate ? 'text-red-500' : 'text-gray-400'}`} />
    </div>
  );
};

export type MapTargetsProps = {
  targets: ('road' | 'poi' | 'map')[];
  size?: keyof typeof sizes;
};

export const MapTargets: React.VFC<MapTargetsProps> = ({ targets, size = 'sm' }) => {
  const activateRoad = targets.includes('road');
  const activatePoi = targets.includes('poi');
  const activateMap = targets.includes('map');

  return (
    <div className="flex space-x-2">
      <MapIcon Icon={SwitchVerticalIcon} activate={activateRoad} size={size} />
      <MapIcon Icon={LocationMarkerIcon} activate={activatePoi} size={size} />
      <MapIcon Icon={OfficeBuildingIcon} activate={activateMap} size={size} />
    </div>
  );
};
