import Select from 'react-select';

import { useFormikContext } from 'formik';
import { countries } from '../../data';

const CountryMultiselect = ({ field = 'country' }) => {
  const { values, setFieldValue } = useFormikContext();

  function handleChange(array) {
    const values = array.map((item) => item.label);
    setFieldValue(field, values);
  }
  const defaultSkills = values?.skillsRequired?.map((item) => ({ label: item, value: item })) || [];
  return (
    <Select
      isMulti
      name="options"
      options={countries}
      onChange={handleChange}
      className="basic-multi-select"
      classNamePrefix="select"
      defaultValue={defaultSkills}
    />
  );
};

export default CountryMultiselect;
