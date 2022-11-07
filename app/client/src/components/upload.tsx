import { useApp } from '../context/app-context';
import UploadError from './upload-error';
import UploadFile from './upload-file';
import UploadSuccess from './upload-success';
import Uploading from './uploading';

const Upload = () => {
  const { isLoading, imageUploaded, error } = useApp();

  if (isLoading) {
    return <Uploading />;
  }

  if (imageUploaded && !isLoading) {
    return <UploadSuccess />;
  }

  if (error && !isLoading) {
    return <UploadError />;
  }

  return <UploadFile />;
};

export default Upload;
