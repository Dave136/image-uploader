import lightMode from '../assets/light-mode.svg';
import darkMode from '../assets/dark-mode.svg';
import useDarkMode from '../hooks/use-dark-mode';

const DarkMode = () => {
  const [isDark, toggleDark] = useDarkMode();

  return (
    <button
      className="w-16 h-16 flex justify-center items-center shadow-lg rounded-full absolute top-10 right-10 transition ease active:bg-gray-200 dark:bg-zinc-700"
      onClick={toggleDark}
    >
      {isDark ? (
        <img src={lightMode} className="w-8" alt="Light mode icon" />
      ) : (
        <img src={darkMode} className="w-8" alt="Dark mode icon" />
      )}
    </button>
  );
};

export default DarkMode;
