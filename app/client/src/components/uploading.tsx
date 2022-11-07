import MainWrapper from './main-wrapper';

const Uploading = () => {
  return (
    <MainWrapper>
      <div className="w-[25.125rem] h-[8.9375rem] rounded-xl shadow-lg bg-zinc-50 flex flex-col px-10 dark:bg-zinc-700">
        <h1 className="text-lg font-semibold text-left mt-[2.25rem] text-custom-color mb-4 dark:text-gray-100">
          Uploading...
        </h1>
        <div className="w-full h-2 flex mt-4 rounded-full bg-custom-light transition ease dark:bg-zinc-600">
          <div className="w-24 h-full bg-primary rounded-full transition animate-loader"></div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default Uploading;
