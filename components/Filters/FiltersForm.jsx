import { Formik } from 'formik';
import { Form } from '../Formik';
const FiltersForm = ({ children, initialValues, setOptions }) => {
  function handleSubmit(values) {
    setOptions(values);
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form autoSubmit>{children}</Form>
    </Formik>
  );
};

export default FiltersForm;
