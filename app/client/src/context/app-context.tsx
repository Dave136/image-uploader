import { createContext, useContext, useMemo, useState } from 'react';

interface IAppContext {
  isLoading: boolean;
  imageUploaded: string;
  uploadedPath: string;
  error?: string;
  setIsLoading: (value: boolean) => void;
  updateImage: (value: string) => void;
  setError: (value: string) => void;
  resetAll: () => void;
}

const initialContext: IAppContext = {
  isLoading: false,
  imageUploaded: '',
  uploadedPath: '',
  error: '',
  setIsLoading: () => false,
  updateImage: () => '',
  setError: () => '',
  resetAll: () => null,
};

const AppContext = createContext<IAppContext>(initialContext);

export const useApp = () => useContext(AppContext);

const getFullPath = (path: string) => {
  const url = import.meta.env.VITE_APP_API_URL;
  return `${url}/${path}`;
};

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<string>('');
  const [uploadedPath, setUploadedPath] = useState<string>('');
  const [error, setError] = useState('');

  const updateImage = (image: string) => {
    setImageUploaded(image);
    setUploadedPath(getFullPath(image));
  };

  const resetAll = () => {
    setIsLoading(false);
    setImageUploaded('');
    setUploadedPath('');
    setError('');
  };

  const globalState = useMemo(
    () => ({
      isLoading,
      error,
      imageUploaded,
      setIsLoading,
      uploadedPath,
      updateImage,
      setError,
      resetAll,
    }),
    [isLoading, imageUploaded, error]
  );

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
