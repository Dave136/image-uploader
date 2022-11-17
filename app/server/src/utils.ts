import { join } from 'path';
import { mkdir } from 'fs/promises';

export const generateUploadFolder = async () => {
  try {
    await mkdir(join(__dirname, 'uploads'));
  } catch (err) {
    // console.error(err);
  }
};
