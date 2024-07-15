import { useFormikContext } from 'formik';
import { useRef, useState } from 'react';
import Button from './Button';

const InputUpload = () => {
  const [fileName, setFileName] = useState('');
  const { setFieldValue } = useFormikContext();
  const ref = useRef();

  const handleClick = (event) => {
    event.preventDefault();
    ref.current.click();
  };
  const handleChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFileName(file.name);
    setFieldValue('image', file);
  };
  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={handleClick} className="button full primary px-12">
          <i className="fas fa-plus-circle mr-2" />
          Upload files
        </Button>
      </div>
      <input
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleChange}
        ref={ref}
        type="file"
      />
      {fileName && <div>File : {fileName}</div>}
    </div>
  );
};
export default InputUpload;
