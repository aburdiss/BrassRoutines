/**
 * @todo Update the range on these to better suite instrument.
 *
 * @function getHornImagePath
 * @description Returns the path to the Horn Exercise with the specified
 * number
 * Created 12/17/20
 * @param {number} number Exercise Number
 * @return require(path) of desired Horn Exercise
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.0.1
 */
export function getHornImagePath(number) {
  switch (number) {
    // Long Tones
    case 1:
      return require('../../../img/Horn/1.png');
    case 2:
      return require('../../../img/Horn/2.png');
    case 3:
      return require('../../../img/Horn/3.png');
    case 4:
      return require('../../../img/Horn/4.png');
    case 5:
      return require('../../../img/Horn/5.png');
    case 6:
      return require('../../../img/Horn/6.png');
    case 7:
      return require('../../../img/Horn/7.png');

    // Slow Lip Slurs
    case 10:
      return require('../../../img/Horn/10.png');
    case 11:
      return require('../../../img/Horn/11.png');
    case 12:
      return require('../../../img/Horn/12.png');
    case 13:
      return require('../../../img/Horn/13.png');
    case 14:
      return require('../../../img/Horn/14.png');
    case 15:
      return require('../../../img/Horn/15.png');
    case 16:
      return require('../../../img/Horn/16.png');
    case 17:
      return require('../../../img/Horn/17.png');
    case 18:
      return require('../../../img/Horn/18.png');
    case 19:
      return require('../../../img/Horn/19.png');

    // Fast Lip Slurs
    case 21:
      return require('../../../img/Horn/21.png');
    case 22:
      return require('../../../img/Horn/22.png');
    case 23:
      return require('../../../img/Horn/23.png');
    case 24:
      return require('../../../img/Horn/24.png');
    case 25:
      return require('../../../img/Horn/25.png');
    case 26:
      return require('../../../img/Horn/26.png');
    case 27:
      return require('../../../img/Horn/27.png');
    case 28:
      return require('../../../img/Trumpet/28.png');

    // Articulation
    case 30:
      return require('../../../img/Horn/30.png');
    case 31:
      return require('../../../img/Horn/31.png');
    case 32:
      return require('../../../img/Horn/32.png');
    case 33:
      return require('../../../img/Horn/33.png');
    case 34:
      return require('../../../img/Horn/34.png');
    case 35:
      return require('../../../img/Horn/35.png');
    case 36:
      return require('../../../img/Horn/36.png');
    case 37:
      return require('../../../img/Horn/37.png');
    case 38:
      return require('../../../img/Horn/38.png');

    // Coordination
    case 40:
      return require('../../../img/Horn/40.png');
    case 41:
      return require('../../../img/Horn/41.png');
    case 42:
      return require('../../../img/Horn/42.png');
    case 43:
      return require('../../../img/Horn/43.png');
    case 44:
      return require('../../../img/Horn/44.png');
    case 45:
      return require('../../../img/Horn/45.png');
    case 46:
      return require('../../../img/Horn/46.png');

    // Major Scales
    case 50:
      return require('../../../img/Trumpet/50.png');
    case 51:
      return require('../../../img/Horn/51.png');
    case 52:
      return require('../../../img/Horn/52.png');
    case 53:
      return require('../../../img/Horn/53.png');
    case 54:
      return require('../../../img/Horn/54.png');
    case 55:
      return require('../../../img/Horn/55.png');
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
      return require('../../../img/Horn/70.png');
    case 71:
      return require('../../../img/Horn/71.png');
    case 72:
      return require('../../../img/Horn/72.png');
    case 73:
      return require('../../../img/Horn/73.png');
    case 74:
      return require('../../../img/Horn/74.png');
    case 75:
      return require('../../../img/Horn/75.png');
    case 76:
      return require('../../../img/Horn/76.png');
    case 77:
      return require('../../../img/Horn/77.png');
    case 78:
      return require('../../../img/Horn/78.png');

    // Low Range
    case 80:
      return require('../../../img/Horn/80.png');
    case 81:
      return require('../../../img/Horn/81.png');
    case 82:
      return require('../../../img/Horn/82.png');
    case 83:
      return require('../../../img/Horn/83.png');
    case 84:
      return require('../../../img/Horn/84.png');
    case 85:
      return require('../../../img/Horn/85.png');
    case 86:
      return require('../../../img/Horn/86.png');
    case 87:
      return require('../../../img/Horn/87.png');

    default:
      return null;
  }
}
