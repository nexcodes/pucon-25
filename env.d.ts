declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: string;
  }
}
