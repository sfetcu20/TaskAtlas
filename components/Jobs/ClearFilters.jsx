import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ClearFilters = ({ setOptions, initialValues, setFiltersUpdated }) => {
  const { resetForm, setFieldValue } = useFormikContext();

  const handleClear = () => {
    setFiltersUpdated(new Date());
    resetForm({ values: initialValues });
    setOptions(initialValues);
  };

  useEffect(() => {
    // Any other side effects you need to handle on filter update
  }, [setFiltersUpdated]);

  return (
    <Button onClick={handleClear} className="button mini secondary">
      Clear
    </Button>
  );
};

export default ClearFilters;
