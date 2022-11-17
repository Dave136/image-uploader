import fastify from 'fastify';
import cors from '@fastify/cors';
import multer from 'fastify-multer';
import path from 'path';
import env from '@fastify/env';
import routes from './routes';
import s3Plugin from './plugins/s3';

const schema = {
  type: 'object',
  required: [
    'PORT',
    'FILEBASE_S3_API_VERSION',
    'FILEBASE_S3_ACCESS_KEY',
    'FILEBASE_S3_SECRET_KEY',
    'FILEBASE_S3_ENDPOINT',
    'FILEBASE_S3_REGION',
    'FILEBASE_S3_BUCKET',
  ],
  properties: {
    PORT: {
      type: 'string',
      default: 5000,
    },
  },
};

(async () => {
  const app = fastify();
  const { PORT } = process.env;
  const host = '0.0.0.0';
  const port = +PORT || 5000;

  app.register(env, {
    schema,
    dotenv: {
      path: path.join(__dirname, '../.env'),
    },
  });
  app.register(cors);
  app.register(multer.contentParser);
  app.register(s3Plugin);
  app.register(routes);

  app.listen(
    {
      host,
      port,
    },
    (err) => {
      if (err) {
        app.close();
        return 0;
      }

      console.log(`Server is running on http://${host}:${port}`);
    },
  );
})();
