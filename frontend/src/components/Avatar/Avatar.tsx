import React from 'react';

import { BASE_URL } from '@/config';

const sizes = {
  sm: 'w-10 h-10',
  md: 'w-15 h-15',
  lg: 'w-20 h-20',
};

export type AvatarProps = {
  name?: string;
  avatar: string;
  size?: keyof typeof sizes;
};

export const Avatar: React.VFC<AvatarProps> = ({ name = '', avatar, size = 'sm' }) => {
  return (
    <img
      src={`${BASE_URL}/${avatar}`}
      alt={name}
      crossOrigin="anonymous"
      className={`bg-gray-200 rounded-full ${sizes[size]}`}
    />
  );
};
