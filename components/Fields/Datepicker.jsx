import { format as dateFormat } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { Input } from '.';
import { isValidDate } from '../../functions';
import { useDisclosure } from '../../hooks';
import { useFormikContext } from 'formik';

const Datepicker = ({ value: initialValue, onChange, calendarProps = {}, field, ...props }) => {
  const [value, setValue] = useState(initialValue);
  const { isOpen, show, hide } = useDisclosure();
  const { setFieldValue } = useFormikContext();

  const onClickDay = (value) => {
    setFieldValue(field, dateFormat(value, 'yyyy-MM-dd'));
    setValue(dateFormat(value, 'yyyy-MM-dd'));
    hide();
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (isValidDate(value) && typeof onChange === 'function') {
      onChange(value);
    }
  }, [value]);

  if (isValidDate(new Date(initialValue))) {
    calendarProps.defaultValue = new Date(initialValue);
  } else {
    calendarProps.defaultValue = new Date();
  }

  return (
    <div className="relative">
      <Input {...props} value={value} onChange={handleChange} />
      <div
        className="absolute h-full top-0 right-0 p-2.5 outline-none cursor-pointer grid place-items-center"
        onClick={show}
      >
        <i className="fas fa-calendar-alt text-primary" />
      </div>

      {isOpen && (
        <Modal centered show={true} onHide={hide}>
          <Calendar onClickDay={onClickDay} {...calendarProps} />
        </Modal>
      )}
    </div>
  );
};

export default Datepicker;
