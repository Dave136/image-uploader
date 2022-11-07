import multer from 'fastify-multer';
import * as path from 'path';
import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./src/uploads'));
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    const timestamp = Date.now();

    const filename = `photo-${timestamp}-${name}.${ext}`;

    cb(null, filename);
  },
});

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  next: (err?: FastifyError) => void,
) {
  const upload = multer({ dest: 'uploads/', storage });
  fastify.post(
    '/',
    { preHandler: upload.single('image') },
    (req: FastifyRequest, reply: FastifyReply) => {
      try {
        return reply.send(req.file.filename);
      } catch (err) {
        return reply
          .status(500)
          .send('There was an error while uploading the image');
      }
    },
  );

  next();
}
