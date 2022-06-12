import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

import { Todo } from '../types';

export const getTodos = async (userId: number): Promise<Todo[]> => {
  const data: Todo[] = await axios.get('todos');
  if (userId === 0) return data;
  const filtered = data.filter((todo: Todo) => todo.userId == userId);
  return filtered;
};

export const useTodos = (userId: number) => {
  return useQuery({
    queryKey: ['todos', userId],
    queryFn: () => getTodos(userId),
  });
};
