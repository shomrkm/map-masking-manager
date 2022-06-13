import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

import { Task } from '../types';

export const getTasks = async (level: string): Promise<Task[]> => {
  const data: Task[] = await axios.get('tasks');
  if (level === '') return data;
  const filtered = data.filter((task: Task) => task.level == level);
  return filtered;
};

export const useTasks = (level: string) => {
  return useQuery({
    queryKey: ['tasks', level],
    queryFn: () => getTasks(level),
  });
};
