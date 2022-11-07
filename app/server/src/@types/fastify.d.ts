type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export type {} from 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    file: MulterFile;
  }
}
