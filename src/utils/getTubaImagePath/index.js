/**
 * @function getTubaImagePath
 * @description Returns the path to the Tuba Exercise with the specified
 * number
 * @param {Number} number Exercise Number
 * @return require(path) of desired Tuba Exercise
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.0
 */
export function getTubaImagePath(number) {
  switch (number) {
    // Long Tones
    case 1:
      return require('../../../img/Tuba/1.png');
    case 2:
      return require('../../../img/Tuba/2.png');
    case 3:
      return require('../../../img/Tuba/3.png');
    case 4:
      return require('../../../img/Tuba/4.png');
    case 5:
      return require('../../../img/Tuba/5.png');
    case 6:
      return require('../../../img/Tuba/6.png');
    case 7:
      return require('../../../img/Tuba/7.png');

    // Slow Lip Slurs
    case 10:
      return require('../../../img/Tuba/10.png');
    case 11:
      return require('../../../img/Tuba/11.png');
    case 12:
      return require('../../../img/Tuba/12.png');
    case 13:
      return require('../../../img/Tuba/13.png');
    case 14:
      return require('../../../img/Tuba/14.png');
    case 15:
      return require('../../../img/Tuba/15.png');
    case 16:
      return require('../../../img/Tuba/16.png');
    case 17:
      return require('../../../img/Tuba/17.png');
    case 18:
      return require('../../../img/Tuba/18.png');
    case 19:
      return require('../../../img/Tuba/19.png');

    // Fast Lip Slurs
    case 21:
      return require('../../../img/Tuba/21.png');
    case 22:
      return require('../../../img/Tuba/22.png');
    case 23:
      return require('../../../img/Tuba/23.png');
    case 24:
      return require('../../../img/Tuba/24.png');
    case 25:
      return require('../../../img/Tuba/25.png');
    case 26:
      return require('../../../img/Tuba/26.png');
    case 27:
      return require('../../../img/Tuba/27.png');
    case 28:
      return require('../../../img/Tuba/28.png');

    // Articulation
    case 30:
      return require('../../../img/Tuba/30.png');
    case 31:
      return require('../../../img/Tuba/31.png');
    case 32:
      return require('../../../img/Tuba/32.png');
    case 33:
      return require('../../../img/Tuba/33.png');
    case 34:
      return require('../../../img/Tuba/34.png');
    case 35:
      return require('../../../img/Tuba/35.png');
    case 36:
      return require('../../../img/Tuba/36.png');
    case 37:
      return require('../../../img/Tuba/37.png');
    case 38:
      return require('../../../img/Tuba/38.png');

    // Coordination
    case 40:
      return require('../../../img/Tuba/40.png');
    case 41:
      return require('../../../img/Tuba/41.png');
    case 42:
      return require('../../../img/Tuba/42.png');
    case 43:
      return require('../../../img/Tuba/43.png');
    case 44:
      return require('../../../img/Tuba/44.png');
    case 45:
      return require('../../../img/Tuba/45.png');
    case 46:
      return require('../../../img/Tuba/46.png');

    // Major Scales
    case 50:
      return require('../../../img/Tuba/50.png');
    case 51:
      return require('../../../img/Tuba/51.png');
    case 52:
      return require('../../../img/Tuba/52.png');
    case 53:
      return require('../../../img/Tuba/53.png');
    case 54:
      return require('../../../img/Tuba/54.png');
    case 55:
      return require('../../../img/Tuba/55.png');
    case 56:
      return require('../../../img/Tuba/56.png');
    case 57:
      return require('../../../img/Tuba/57.png');
    case 58:
      return require('../../../img/Tuba/58.png');
    case 59:
      return require('../../../img/Tuba/59.png');
    case 60:
      return require('../../../img/Tuba/60.png');
    case 61:
      return require('../../../img/Tuba/61.png');

    // High Range
    case 70:
      return require('../../../img/Tuba/70.png');
    case 71:
      return require('../../../img/Tuba/71.png');
    case 72:
      return require('../../../img/Tuba/72.png');
    case 73:
      return require('../../../img/Tuba/73.png');
    case 74:
      return require('../../../img/Tuba/74.png');
    case 75:
      return require('../../../img/Tuba/75.png');
    case 76:
      return require('../../../img/Tuba/76.png');
    case 77:
      return require('../../../img/Tuba/77.png');
    case 78:
      return require('../../../img/Tuba/78.png');

    // Low Range
    case 80:
      return require('../../../img/Tuba/80.png');
    case 81:
      return require('../../../img/Tuba/81.png');
    case 82:
      return require('../../../img/Tuba/82.png');
    case 83:
      return require('../../../img/Tuba/83.png');
    case 84:
      return require('../../../img/Tuba/84.png');
    case 85:
      return require('../../../img/Tuba/85.png');
    case 86:
      return require('../../../img/Tuba/86.png');
    case 87:
      return require('../../../img/Tuba/87.png');

    default:
      return null;
  }
}
