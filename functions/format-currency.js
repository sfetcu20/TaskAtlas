import { round } from 'lodash';

function formatCurrency(number, precision = 2, currency = '€') {
  const roundedNumber = round(number, precision);
  const formatter = new Intl.NumberFormat('en-US');
  return `${formatter.format(roundedNumber)}${currency}`;
}

export default formatCurrency;
