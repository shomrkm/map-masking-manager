import React, { useCallback } from 'react';

import { useAuth } from '../hooks/useAuth';

export enum ROLES {
  admin = 'admin',
  publisher = 'publisher',
  mapper = 'mapper',
}

type RoleTypes = keyof typeof ROLES;

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.role);
      }

      return true;
    },
    [user.role]
  );

  return { checkAccess, role: user.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
  allowedRoles: RoleTypes[];
};

export const Authorization = ({
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
