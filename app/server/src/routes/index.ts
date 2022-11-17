import api from './api';
import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  next: (err?: FastifyError) => void,
) {
  fastify.register(api, {
    prefix: 'api',
  });

  fastify.get(
    '/:name',
    (
      req: FastifyRequest<{ Params: { name: string } }>,
      reply: FastifyReply,
    ) => {
      if (!req.params.name) {
        return reply.status(401).send('Name param is required');
      }

      fastify.s3.getObject(
        { Bucket: process.env.FILEBASE_S3_BUCKET, Key: req.params.name },
        (err, data) => {
          if (err) {
            console.error(err);
            return reply
              .status(500)
              .send('There was an error while uploading the image');
          }

          return reply
            .headers({
              'content-type': data.ContentType,
            })
            .send(data.Body);
        },
      );
    },
  );

  fastify.post(
    '/get-image',
    (req: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) => {
      if (!req.body.name) {
        return reply.status(401).send('[name] is required');
      }

      fastify.s3.getObject(
        { Bucket: process.env.FILEBASE_S3_BUCKET, Key: req.body.name },
        (err, data) => {
          if (err) {
            console.error(err);
            return reply
              .status(500)
              .send('There was an error while uploading the image');
          }

          return reply.send(data.Body);
        },
      );
    },
  );

  next();
}
