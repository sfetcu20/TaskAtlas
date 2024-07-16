import { Field, useFormikContext } from 'formik';
import { memo, useCallback, useEffect, useState } from 'react';
import { Dropdown, Fieldset } from '../Formik';
import { countries } from '../../data';

const CountyDropdown = memo(function CountyDropdown({
  id = 'country',
  label = '',
  name = 'country',
  placeholder = '',
  required = false,
}) {
  const { values, setFieldValue } = useFormikContext();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setSelectedValue(values[name] || '');
  }, [values, name]);

  const handleSelect = useCallback(
    (value) => {
      setSelectedValue(value);
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
        value={selectedValue}
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
