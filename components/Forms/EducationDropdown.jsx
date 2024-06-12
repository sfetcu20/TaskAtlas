import { useFormikContext } from 'formik';

import { education } from '../../data';

const educationOptions = education.map((option) => ({
  value: option,
  label: option,
}));

import Select from 'react-select';

const educationDropdown = () => {
  const { setFieldValue } = useFormikContext();
  const handleChange = (option) => {
    setFieldValue('education', '');
    if (option.value != 'No education required') {
      setFieldValue('education', option.value);
    }
  };
  return (
    <Select
      name="education"
      onChange={handleChange}
      options={educationOptions}
      classNamePrefix="select"
    />
  );
};

export default educationDropdown;
