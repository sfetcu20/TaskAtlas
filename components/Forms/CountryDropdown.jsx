import { Field, useFormikContext } from 'formik';
import { memo, useCallback } from 'react';
import { Dropdown, Fieldset } from '../Formik';
import { countries } from '../../data';

const CountyDropdown = memo(function CountyDropdown({
  id = 'country',
  label = '',
  name = 'country',
  placeholder = '',
  required = false,
}) {
  const { setFieldValue } = useFormikContext();

  const handleSelect = useCallback(
    (value) => {
      setFieldValue('city', '');
      setFieldValue(name, value);
    },
    [name, setFieldValue]
  );

  return (
    <Fieldset label={label} name={name} required={required}>
      <Field
        as={Dropdown}
        id={id}
        name={name}
        onSelectCustom={handleSelect}
        placeholder={placeholder}
      >
        <option value="" disabled hidden></option>
        {countries.map((county) => (
          <option value={county?.label} key={county?.value}>
            {county?.label}
          </option>
        ))}
      </Field>
    </Fieldset>
  );
});

export default CountyDropdown;
