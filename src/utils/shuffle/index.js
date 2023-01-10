/**
 * @function shuffle
 * @description Shuffles an array that is passed in
 * Created February 5, 2022
 * @param {*[]} input An array to shuffle the contents of
 * @returns {*[]} A shuffled version of the inputted array
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/2023
 * @version 1.0.0
 */
export function shuffle(input) {
  const array = [...input];
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
