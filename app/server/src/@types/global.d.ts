declare namespace NodeJS {
  export type Environment = 'production' | 'development' | 'testing';

  export interface ProcessEnv {
    NODE_ENV: Environment;
    PORT: string;
    FILEBASE_S3_API_VERSION: string;
    FILEBASE_S3_ACCESS_KEY: string;
    FILEBASE_S3_SECRET_KEY: string;
    FILEBASE_S3_ENDPOINT: string;
    FILEBASE_S3_REGION: string;
    FILEBASE_S3_BUCKET: string;
  }
}
