import { useEffect, useState } from 'react';

const STORAGE_KEY = 'uploader::theme';

export type UseDarkMode = [boolean, () => void];

const useDarkMode = (): UseDarkMode => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem(STORAGE_KEY);
    if (
      item === 'dark' ||
      (!(STORAGE_KEY in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDark = () => {
    if (!isDark) {
      localStorage.setItem(STORAGE_KEY, 'dark');
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      localStorage.setItem(STORAGE_KEY, 'light');
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  };

  return [isDark, toggleDark];
};

export default useDarkMode;
