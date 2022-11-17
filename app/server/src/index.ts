import fastify from 'fastify';
import cors from '@fastify/cors';
import multer from 'fastify-multer';
import fastifyStatic from '@fastify/static';
import * as path from 'path';
import routes from './routes';
import { generateUploadFolder } from './utils';

(async () => {
  const app = fastify();
  const host = '0.0.0.0';
  const port = +process.env.PORT || 5000;

  generateUploadFolder();

  app.register(cors);
  app.register(multer.contentParser);
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/',
  });
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
