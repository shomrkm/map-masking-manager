export type User = {
  name: string;
  email: string;
  role: 'admin' | 'publisher' | 'mapper';
  level: 'expert' | 'intermediate' | 'beginner';
  avatar: string;
};
