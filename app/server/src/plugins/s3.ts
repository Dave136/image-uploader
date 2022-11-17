import AWS from 'aws-sdk';
import fp from 'fastify-plugin';

import type { FastifyError, FastifyInstance } from 'fastify';

const s3FilebasePlugin = (
  fastify: FastifyInstance,
  _: unknown,
  next: (err?: FastifyError) => void,
) => {
  const s3 = new AWS.S3({
    apiVersion: process.env.FILEBASE_S3_API_VERSION,
    credentials: {
      accessKeyId: process.env.FILEBASE_S3_ACCESS_KEY,
      secretAccessKey: process.env.FILEBASE_S3_SECRET_KEY,
    },
    endpoint: process.env.FILEBASE_S3_ENDPOINT,
    region: process.env.FILEBASE_S3_REGION,
    s3ForcePathStyle: true,
  });

  fastify.decorate('s3', s3);

  next();
};

export default fp(s3FilebasePlugin, {
  fastify: '4.x',
  name: 's3-filebase-plugin',
});
