import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getUser } from '@/features/auth/api/getUser';
import { loginWithEmailAndPassword } from '@/features/auth/api/login';
import { logout } from '@/features/auth/api/logout';
import storage from '@/utils/storage';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string>();

  const { data: user, error, refetch } = useQuery(['auth-user'], () => getUser(token));

  useEffect(() => {
    const getAuthUser = async (token: string) => await getUser(token);

    if (!token) {
      queryClient.clear();
      storage.clearToken();
      return;
    }
    storage.setToken(token);
    const user = getAuthUser(token);
    if (!user) return;

    queryClient.setQueryData('auth-user', user);
  }, [token, queryClient]);

  const loginMutation = useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: ({ token }) => setToken(token),
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => setToken(undefined),
  });

  const value = React.useMemo(
    () => ({
      user,
      error,
      refetch,
      login: loginMutation.mutateAsync,
      logout: logoutMutation.mutateAsync,
    }),
    [user, error, refetch, loginMutation.mutateAsync, logoutMutation.mutateAsync]
  );

  return value;
};
