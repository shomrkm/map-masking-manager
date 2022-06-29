declare namespace NodeJS {
  // type definition for process.env (override @types/node)
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly PORT: string;
    readonly MONGO_URI: string;
    readonly JWT_SECRET: string;
    readonly JWT_EXPIRE: string;
    readonly JWT_COOKIE_EXPIRE: string;
  }
}
