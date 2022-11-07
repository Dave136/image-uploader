import useMessage from './hooks/use-message';

function App() {
  const message = useMessage();

  return (
    <div className="mx-auto flex items-center justify-center flex-col bg-neutral-800 text-gray-300 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold underline mb-4">Image Uploader</h1>
        <p className="font-bold">
          Message from server:{' '}
          <span className="font-normal">{message ?? 'Loading...'}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
