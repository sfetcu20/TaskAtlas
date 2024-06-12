import _ from 'lodash';

function removeDiacriticsAndLowercase(str) {
  // Normalize the string and remove diacritical marks
  const normalizedString = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Convert the string to lowercase
  return _.toLower(normalizedString);
}
export default removeDiacriticsAndLowercase;
