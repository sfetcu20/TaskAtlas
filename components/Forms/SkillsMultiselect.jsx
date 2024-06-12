import Select from 'react-select';
import skills from '../../data/skills';
import { useFormikContext } from 'formik';

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
