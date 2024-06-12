import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { Dropdown as DropdownField } from '../Fields';
const Dropdown = ({ children, name, onSelectCustom, ...props }) => {
  const { setFieldValue, values } = useFormikContext();

  const handleSelectDefault = (value) => {
    setFieldValue(name, value);
  };

  const handleSelect = onSelectCustom ?? handleSelectDefault;

  return (
    <DropdownField defaultSelected={get(values, name)} onSelect={handleSelect} {...props}>
      {children}
    </DropdownField>
  );
};

export default Dropdown;
