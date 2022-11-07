import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
} from 'fastify';
import v1 from './v1';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  next: (err?: FastifyError) => void,
) {
  fastify.register(v1, {
    prefix: 'v1',
  });

  next();
}
