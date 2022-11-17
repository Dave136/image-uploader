import { useRef } from 'react';
import axios from '../config/axios';
import { useApp } from '../context/app-context';
import DropZone from './drop-zone';
import MainWrapper from './main-wrapper';

// 1024 * 1024 = 1048576 -> 1mb
const LIMIT_IMAGE_SIZE = 1048576;

const UploadFile = () => {
  const { setIsLoading, updateImage, setError } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);

  const handlerFile = async (files: File[]) => {
    try {
      setIsLoading(true);
      const file = files[0];
      const formData = new FormData();

      if (file.size > LIMIT_IMAGE_SIZE) {
        setError('Image size exceeds limit');
        return;
      }

      formData.append('image', file);

      const { data } = await axios.post('/api/v1/upload', formData);

      updateImage(data);
    } catch (err) {
      console.log('Was an error while uploading image');
      setError('There was an error while uploading image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainWrapper>
      <div className="w-[25.125rem] h-[29.3125rem] rounded-xl shadow-lg bg-zinc-50 flex flex-col items-center dark:bg-zinc-700">
        <h1 className="text-lg font-semibold text-center mt-[2.25rem] text-custom-color dark:text-gray-100">
          Image Uploader
        </h1>
        <p className="text-center text-custom-color text-[.625rem] mt-4 mb-[1.875rem] dark:text-gray-100">
          File should be jpeg, png...
        </p>
        <DropZone onFiles={handlerFile} />
        <p className="text-custom-color text-xs mt-[1.1875rem] dark:text-gray-100">
          Or
        </p>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={() => {
            handlerFile(fileRef.current?.files as unknown as File[]);
          }}
        />
        <button
          className="bg-primary text-white p-3 rounded-lg text-xs mt-[1.3125rem] hover:bg-primary-hover active:bg-primary-hover"
          onClick={() => {
            fileRef.current?.click();
          }}
        >
          Choose a file
        </button>
      </div>
    </MainWrapper>
  );
};

export default UploadFile;
