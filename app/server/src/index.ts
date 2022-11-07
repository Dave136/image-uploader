import fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import cors from '@fastify/cors';

(async () => {
  const app = fastify();
  const host = '0.0.0.0';
  const port = +process.env.PORT || 5000;

  app.register(cors);

  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      message: 'Hi from API',
    });
  });

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
