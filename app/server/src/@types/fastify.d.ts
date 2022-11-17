import type { File } from 'fastify-multer/lib/interfaces';

export type {} from 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    file: File;
  }

  interface FastifyInstance {
    s3: AWS.S3;
    config: {
      PORT: string;
      FILEBASE_S3_API_VERSION: string;
      FILEBASE_S3_ACCESS_KEY: string;
      FILEBASE_S3_SECRET_KEY: string;
      FILEBASE_S3_ENDPOINT: string;
      FILEBASE_S3_REGION: string;
      FILEBASE_S3_BUCKET: string;
    };
  }
}
