import { useEffect, useRef, useState } from 'react';
import axios from '../config/axios';
import { useApp } from '../context/app-context';

const getBase64 = (base64: string) => {
  return `data:image/png;base64,${base64}`;
};

const UploadedImage = () => {
  const { imageUploaded } = useApp();
  const [imageSrc, setImageSrc] = useState('');
  const isUnmounted = useRef(false);

  useEffect(() => {
    isUnmounted.current = false;
    const getImage = async () => {
      const { data } = await axios.post('/get-image', {
        name: imageUploaded,
      });

      setImageSrc(data);
    };

    setTimeout(() => {
      getImage();
    }, 2000);
  }, [imageUploaded]);

  return (
    <div className="w-[21.125rem] h-[13.6813rem] bg-custom-color-2 rounded-xl flex flex-col items-center justify-evenly transition ease dark:text-gray-100 dark:bg-zinc-600">
      {imageSrc ? (
        <img
          className="w-[21.125rem] h-[13.6813rem] rounded-xl object-contain object-center"
          src={getBase64(imageSrc)}
          alt="Image uploaded"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UploadedImage;
