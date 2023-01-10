/**
 * @function capitalize
 * @description Capitalizes the first letter of the string passed in.
 * Created 9/11/21
 * @param {string} inputString Any string
 * @returns {string} The input string with the first letter capitalized and the
 * rest of the string unaffected
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.0.1
 */
export function capitalize(inputString) {
  if (typeof inputString !== 'string') {
    return undefined;
  }
  const firstLetter = inputString[0];
  const restOfString = inputString.slice(1);
  return `${firstLetter.toUpperCase()}${restOfString}`;
}
