import React, { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getUser } from '@/features/auth/api/getUser';
import { loginWithEmailAndPassword } from '@/features/auth/api/login';
import { logout } from '@/features/auth/api/logout';
import { User } from '@/features/users';
import storage from '@/utils/storage';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loadUser = useCallback(() => {
    if (!storage.getToken()) {
      return null;
    }
    const data = getUser();
    return data;
  }, []);

  const { data: user, error } = useQuery({
    queryKey: 'auth-user',
    queryFn: loadUser,
  });

  const setUser = useCallback(
    (data: User) => queryClient.setQueryData('auth-user', data),
    [queryClient]
  );

  const loginMutation = useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: ({ data, token }) => {
      setUser(data);
      storage.setToken(token);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      storage.clearToken();
      window.location.assign(window.location.origin as unknown as string);
    },
  });

  const value = React.useMemo(
    () => ({
      user,
      error,
      login: loginMutation.mutateAsync,
      logout: logoutMutation.mutateAsync,
    }),
    [user, error, loginMutation.mutateAsync, logoutMutation.mutateAsync]
  );

  return value;
};
