import { format, isValid } from 'date-fns';
import { ro } from 'date-fns/locale';

const formatDate = (date, dateFormat = 'yyyy-MM-dd') => {
  const parsedDate = new Date(date);
  if (!isValid(parsedDate)) {
    return '';
  }
  return format(parsedDate, dateFormat, { locale: ro });
};

export default formatDate;
