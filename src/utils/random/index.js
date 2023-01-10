/**
 * @function random
 * @description Gets a random number between the min and max
 * @param {number} min The min number to get a random from (Optionally a max,
 * if no max is passed in. Zero will be used for the min in that case)
 * Created 2/5/22
 * @param {number} max The max number to get a random from
 * @returns {number} A random number between the min and max passed in
 *
 * @copyright 2023 Alexander Buriss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.0.0
 */
export function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}
