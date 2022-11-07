import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
} from 'fastify';
import uploader from './uploader';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  next: (err?: FastifyError) => void,
) {
  fastify.register(uploader, {
    prefix: 'upload',
  });

  next();
}
