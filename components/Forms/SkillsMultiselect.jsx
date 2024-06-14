import Select from 'react-select';

import { useFormikContext } from 'formik';
import { skills } from '../../data';

const SkillsMultiselect = () => {
  const { setFieldValue } = useFormikContext();

  function handleChange(array) {
    const values = array.map((item) => item.label);
    setFieldValue('skillsRequired', values);
  }
  return (
    <Select
      isMulti
      name="options"
      options={skills}
      onChange={handleChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

export default SkillsMultiselect;
