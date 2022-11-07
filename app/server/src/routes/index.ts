import api from './api';
import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  next: (err?: FastifyError) => void,
) {
  fastify.register(api, {
    prefix: 'api',
  });

  next();
}
