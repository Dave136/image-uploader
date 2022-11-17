import useClickboard from 'react-use-clipboard';
import MainWrapper from './main-wrapper';
import UploadedImage from './uploaded-image';
import checkImage from '../assets/check_circle.svg';
import { useApp } from '../context/app-context';

const UploadSuccess = () => {
  const { uploadedPath } = useApp();
  const [isCopied, setCopied] = useClickboard(uploadedPath);

  return (
    <MainWrapper>
      <div className="w-[25.125rem] pt-9 rounded-xl shadow-lg bg-zinc-50 flex flex-col items-center dark:bg-zinc-700">
        <img
          src={checkImage}
          className="w-[2.1875rem] mb-3"
          alt="Green check"
        />
        <h1 className="text-lg font-semibold text-center mb-[1.5625rem] text-custom-color dark:text-gray-100">
          Uploaded Successfully!
        </h1>
        <UploadedImage />
        <div className="mt-[1.5625rem] min-w-[21.125rem] mb-[2.0625rem]">
          <div className="border border-custom-color-1 bg-custom-color-2 h-[2.125rem] rounded-lg w-full flex items-center p-2 pr-0 dark:bg-zinc-600 dark:border-zinc-700">
            <p className="truncate text-[.5rem] w-full pr-2 text-custom-color dark:text-gray-200">
              {uploadedPath}
            </p>
            <button
              className="bg-primary text-white p-3 min-w-[4rem] h-[1.875rem] rounded-lg text-[.5rem] flex justify-center transition ease items-center hover:bg-primary-hover"
              onClick={setCopied}
              disabled={isCopied}
            >
              {isCopied ? 'Copied' : 'Copy Link'}
            </button>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default UploadSuccess;
