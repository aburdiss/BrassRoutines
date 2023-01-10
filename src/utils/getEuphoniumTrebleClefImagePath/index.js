/**
 * @function getEuphoniumTrebleClefImagePath
 * @description Returns the path to the Euphonium Exercise with the specified
 * number in Treble Clef. Note: These use Trumpet Exercises when available to
 * save memory.
 * Created 12/25/20
 * @param {number} number Exercise Number
 * @return {Object} require(path) of desired Euphonium Exercise
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.1.1
 */
export function getEuphoniumTrebleClefImagePath(number) {
  switch (number) {
    // Long Tones
    case 1:
      return require('../../../img/Trumpet/1.png');
    case 2:
      return require('../../../img/Trumpet/2.png');
    case 3:
      return require('../../../img/Trumpet/3.png');
    case 4:
      return require('../../../img/Trumpet/4.png');
    case 5:
      return require('../../../img/Trumpet/5.png');
    case 6:
      return require('../../../img/Trumpet/6.png');
    case 7:
      return require('../../../img/Trumpet/7.png');

    // Slow Lip Slurs
    case 10:
      return require('../../../img/Trumpet/10.png');
    case 11:
      return require('../../../img/Trumpet/11.png');
    case 12:
      return require('../../../img/Trumpet/12.png');
    case 13:
      return require('../../../img/Trumpet/13.png');
    case 14:
      return require('../../../img/Trumpet/14.png');
    case 15:
      return require('../../../img/Trumpet/15.png');
    case 16:
      return require('../../../img/Trumpet/16.png');
    case 17:
      return require('../../../img/Trumpet/17.png');
    case 18:
      return require('../../../img/Trumpet/18.png');
    case 19:
      return require('../../../img/Trumpet/19.png');

    // Fast Lip Slurs
    case 21:
      return require('../../../img/Trumpet/21.png');
    case 22:
      return require('../../../img/Trumpet/22.png');
    case 23:
      return require('../../../img/Trumpet/23.png');
    case 24:
      return require('../../../img/Trumpet/24.png');
    case 25:
      return require('../../../img/Trumpet/25.png');
    case 26:
      return require('../../../img/Trumpet/26.png');
    case 27:
      return require('../../../img/Trumpet/27.png');
    case 28:
      return require('../../../img/Trumpet/28.png');

    // Articulation
    case 30:
      return require('../../../img/Trumpet/30.png');
    case 31:
      return require('../../../img/Trumpet/31.png');
    case 32:
      return require('../../../img/Trumpet/32.png');
    case 33:
      return require('../../../img/Trumpet/33.png');
    case 34:
      return require('../../../img/Trumpet/34.png');
    case 35:
      return require('../../../img/Trumpet/35.png');
    case 36:
      return require('../../../img/Trumpet/36.png');
    case 37:
      return require('../../../img/Trumpet/37.png');
    case 38:
      return require('../../../img/Trumpet/38.png');

    // Coordination
    case 40:
      return require('../../../img/Trumpet/40.png');
    case 41:
      return require('../../../img/Trumpet/41.png');
    case 42:
      return require('../../../img/Trumpet/42.png');
    case 43:
      return require('../../../img/Trumpet/43.png');
    case 44:
      return require('../../../img/Trumpet/44.png');
    case 45:
      return require('../../../img/Trumpet/45.png');
    case 46:
      return require('../../../img/Trumpet/46.png');

    // Major Scales
    case 50:
      return require('../../../img/Trumpet/50.png');
    case 51:
      return require('../../../img/Trumpet/51.png');
    case 52:
      return require('../../../img/Trumpet/52.png');
    case 53:
      return require('../../../img/Trumpet/53.png');
    case 54:
      return require('../../../img/Trumpet/54.png');
    case 55:
      return require('../../../img/Trumpet/55.png');
    case 56:
      return require('../../../img/Trumpet/56.png');
    case 57:
      return require('../../../img/Trumpet/57.png');
    case 58:
      return require('../../../img/Trumpet/58.png');
    case 59:
      return require('../../../img/Trumpet/59.png');
    case 60:
      return require('../../../img/Trumpet/60.png');
    case 61:
      return require('../../../img/Trumpet/61.png');

    // High Range
    case 70:
      return require('../../../img/Trumpet/70.png');
    case 71:
      return require('../../../img/Trumpet/71.png');
    case 72:
      return require('../../../img/Trumpet/72.png');
    case 73:
      return require('../../../img/Trumpet/73.png');
    case 74:
      return require('../../../img/Trumpet/74.png');
    case 75:
      return require('../../../img/Trumpet/75.png');
    case 76:
      return require('../../../img/Trumpet/76.png');
    case 77:
      return require('../../../img/Trumpet/77.png');
    case 78:
      return require('../../../img/Trumpet/78.png');

    // Low Range
    case 80:
      return require('../../../img/Trumpet/80.png');
    case 81:
      return require('../../../img/Trumpet/81.png');
    case 82:
      return require('../../../img/Trumpet/82.png');
    case 83:
      return require('../../../img/Trumpet/83.png');
    case 84:
      return require('../../../img/Trumpet/84.png');
    case 85:
      return require('../../../img/Trumpet/85.png');
    case 86:
      return require('../../../img/Trumpet/86.png');
    case 87:
      return require('../../../img/Trumpet/87.png');

    default:
      return null;
  }
}
