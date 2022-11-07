import { useApp } from '../context/app-context';

const UploadedImage = () => {
  const { uploadedPath } = useApp();

  return (
    <div className="w-[21.125rem] h-[13.6813rem] bg-custom-color-2 rounded-xl flex flex-col items-center justify-evenly transition ease dark:text-gray-100 dark:bg-zinc-600">
      <img
        className="w-[21.125rem] h-[13.6813rem] rounded-xl object-contain object-center"
        src={uploadedPath}
        alt="Image uploaded"
      />
    </div>
  );
};

export default UploadedImage;
