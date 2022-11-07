type Props = {
  children: JSX.Element[] | JSX.Element;
};

const MainWrapper = ({ children }: Props): JSX.Element => {
  return (
    <div className="mx-auto flex items-center justify-center flex-col bg-[#FAFAFB] min-h-screen dark:bg-zinc-800">
      {children}
    </div>
  );
};

export default MainWrapper;
