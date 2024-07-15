import { useFormikContext } from 'formik';
import { FileDrop } from 'react-file-drop';

const DropCard = () => {
  const { setFieldValue } = useFormikContext();
  const handleDrop = (files, event) => {
    event.preventDefault();
    const file = files[0];
    setFieldValue('image', file);
  };

  return (
    <FileDrop onDrop={handleDrop} className="w-full mx-h-10 rounded-lg">
      <div className="drag-div my-6 flex w-full  gap-5 flex-col items-center justify-center rounded-lg border-4 border-dashed border-gray-400 bg-white p-7">
        <i className="fa-solid fa-cloud-arrow-up text-5xl text-gray-700" />
        <h2 className="font-semibold text-gray-600">Drag and drop files to upload</h2>
      </div>
    </FileDrop>
  );
};

export default DropCard;
