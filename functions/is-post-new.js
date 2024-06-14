import { differenceInDays } from 'date-fns';

const isPostNew = (date) => {
  const today = new Date();
  const diffDays = differenceInDays(today, new Date(date));
  return diffDays <= 7;
};

export default isPostNew;
