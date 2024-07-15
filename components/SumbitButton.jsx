import { useFormikContext } from 'formik';
import Button from './Button';

const SubmitButton = ({ post, handleSubmit }) => {
  const { values } = useFormikContext();
  return (
    <Button className="button full primary" onClick={() => handleSubmit(post._id, values)}>
      Save
    </Button>
  );
};
export default SubmitButton;
