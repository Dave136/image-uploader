import { useApp } from '../context/app-context';
import MainWrapper from './main-wrapper';
import errorImage from '../assets/error.svg';

const UploadError = () => {
  const { error, resetAll } = useApp();

  return (
    <MainWrapper>
      <div className="w-[25.125rem] pt-9 rounded-xl shadow-lg bg-zinc-50 flex flex-col items-center dark:bg-zinc-700">
        <img
          src={errorImage}
          className="w-[2.1875rem] mb-3"
          alt="Green check"
        />
        <h1 className="text-lg font-semibold text-center text-custom-color dark:text-gray-100">
          Oops! ☹️
        </h1>
        <p className="text-center text-custom-color text-[.625rem] mt-4 dark:text-gray-100">
          {error ?? 'There was a problem while uploading image'}
        </p>
        <div className="mt-[1.5625rem] max-w-[21.125rem] mb-[2.0625rem]">
          <button
            className="bg-primary text-white p-3 w-22 h-[1.875rem] rounded-lg text-[.5rem] flex justify-center transition ease items-center hover:bg-primary-hover"
            onClick={resetAll}
          >
            Try again
          </button>
        </div>
      </div>
    </MainWrapper>
  );
};

export default UploadError;
