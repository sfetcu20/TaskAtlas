function removeDuplicates(inputString) {
  // Split the input string by commas
  let wordsArray = inputString.split(',').map((word) => word.trim());

  // Create a Set to remove duplicates
  let uniqueWordsSet = new Set(wordsArray);

  // Convert the Set back to an array
  let uniqueWordsArray = Array.from(uniqueWordsSet);

  // Join the array back into a comma-separated string
  let resultString = uniqueWordsArray.join(', ');

  return resultString;
}
export default removeDuplicates;
