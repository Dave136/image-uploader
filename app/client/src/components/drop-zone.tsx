import useDrop from '../hooks/use-drop';
import image from '../assets/image.svg';

type Props = {
  onFiles: (files: File[]) => void;
};

const DropZone = ({ onFiles }: Props) => {
  const [bond, { over }] = useDrop({
    onFiles,
  });

  return (
    <div
      {...bond}
      className={`w-[21.125rem] h-[13.6813rem] bg-[#F6F8FB] border-2 border-dashed border-[#97BEF4] rounded-xl flex flex-col items-center justify-evenly transition ease dark:bg-zinc-600 ${
        over && 'bg-[#ececec] border-[#3f87eb] dark:bg-zinc-700'
      }`}
    >
      <img width={114} height={88} src={image} alt="Image sample" />
      <p className="text-xs text-[#bdbdbd]">Drag & Drop your image here</p>
    </div>
  );
};

export default DropZone;
