import multer from 'fastify-multer';
import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import type { File } from 'fastify-multer/lib/interfaces';

const storage = multer.memoryStorage();

const getNewFileName = (file: File) => {
  const timestamp = Date.now();
  const filename = `photo-${timestamp}-${file.originalname}`;

  return filename;
};

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  next: (err?: FastifyError) => void,
) {
  const upload = multer({ storage });
  fastify.post(
    '/',
    { preHandler: upload.single('image') },
    (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const newFileName = getNewFileName(req.file);

        const request = fastify.s3.putObject({
          Bucket: process.env.FILEBASE_S3_BUCKET,
          Key: newFileName,
          ContentType: req.file.mimetype,
          Body: req.file.buffer,
          ACL: 'public-read',
        });

        request.send((err) => {
          if (err) {
            console.error(err);
            return reply
              .status(500)
              .send('There was an error while uploading the image');
          }
        });

        return reply.send(newFileName);
      } catch (err) {
        return reply
          .status(500)
          .send('There was an error while uploading the image');
      }
    },
  );

  next();
}
