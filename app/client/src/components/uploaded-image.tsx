import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { useApp } from '../context/app-context';

const getBase64 = (base64: string) => {
  return `data:image/png;base64,${base64}`;
};

const UploadedImage = () => {
  const { imageUploaded } = useApp();
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const getImage = async () => {
      const { data } = await axios.post('/get-image', {
        name: imageUploaded,
      });

      setImageSrc(data);
    };

    setTimeout(() => {
      getImage();
    }, 2000);
  }, []);

  return (
    <div className="w-[21.125rem] h-[13.6813rem] bg-custom-color-2 rounded-xl flex flex-col items-center justify-evenly transition ease dark:text-gray-100 dark:bg-zinc-600">
      {imageSrc ? (
        <img
          className="w-[21.125rem] h-[13.6813rem] rounded-xl object-contain object-center"
          src={getBase64(imageSrc)}
          alt="Image uploaded"
        />
      ) : (
        <div className="animate-pulse">
          <div className="flex justify-center items-center w-full h-56 bg-gray-300 rounded sm:w-96 dark:bg-zinc-700">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedImage;
