// iOS System Colors
export const colors = {
  white: 'rgb(255, 255, 255)',
  systemGray6Light: 'rgb(242, 242, 247)',
  systemGray5Light: 'rgb(229, 229, 234)',
  systemGray4Light: 'rgb(209, 209, 214)',
  systemGray3Light: 'rgb(199, 199, 204)',
  systemGray2Light: 'rgb(174, 174, 178)',
  systemGray: 'rgb(142, 142, 147)',
  systemGray2Dark: 'rgb(99, 99, 102)',
  systemGray3Dark: 'rgb(72, 72, 74)',
  systemGray4Dark: 'rgb(58, 58, 60)',
  systemGray5Dark: 'rgb(44, 44, 46)',
  systemGray6Dark: 'rgb(28, 28, 30)',
  black: 'rgb(0, 0, 0)',

  redLight: 'rgb(255, 59, 48)',
  redDark: 'rgb(255, 69, 58)',

  orangeLight: 'rgb(255, 149, 0)',
  orangeDark: 'rgb(255, 159, 10)',

  yellowLight: 'rgb(255, 204, 0)',
  yellowDark: 'rgb(255, 214, 10)',

  greenLight: 'rgb(52, 199, 89)',
  greenDark: 'rgb(48, 209, 88)',

  tealLight: 'rgb(90, 200, 250)',
  tealDark: 'rgb(100, 210, 255)',

  blueLight: 'rgb(0, 122, 255)',
  blueDark: 'rgb(10, 132, 255)',

  indigoLight: 'rgb(88, 86, 214)',
  indigoDark: 'rgb(94, 92, 230)',

  purpleLight: 'rgb(175, 82, 222)',
  purpleDark: 'rgb(191, 90, 242)',

  pinkLight: 'rgb(255, 45, 85)',
  pinkDark: 'rgb(255, 55, 98)',
};

export const tromboneExercises = {
  longTones: [1, 2, 3, 4, 5, 6, 7],
  slowLipSlurs: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  fastLipSlurs: [21, 22, 23, 24, 25, 26, 27],
  articulation: [30, 31, 32, 33, 34, 35, 36, 37, 38],
  coordination: [40, 41, 42, 43, 44, 45, 46],
  majorScales: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
  highRange: [70, 71, 72, 73, 74, 75, 76, 77, 78],
  lowRange: [80, 81, 82, 83, 84, 85, 86, 87],
};

/**
 * @function getTromboneImagePath
 * @description Returns the path to the Trombone Exercise with the specified
 * number
 * @param {Number} number Exercise Number
 * @return require(path) of desired Trombone Exercise
 * @author Alexander Burdiss
 * @since 12/9/20
 * @version 1.0
 */
export function getTromboneImagePath(number) {
  switch (number) {
    // Long Tones
    case 1:
      return require('../../img/Trombone/1.png');
    case 2:
      return require('../../img/Trombone/2.png');
    case 3:
      return require('../../img/Trombone/3.png');
    case 4:
      return require('../../img/Trombone/4.png');
    case 5:
      return require('../../img/Trombone/5.png');
    case 6:
      return require('../../img/Trombone/6.png');
    case 7:
      return require('../../img/Trombone/7.png');

    // Slow Lip Slurs
    case 10:
      return require('../../img/Trombone/10.png');
    case 11:
      return require('../../img/Trombone/11.png');
    case 12:
      return require('../../img/Trombone/12.png');
    case 13:
      return require('../../img/Trombone/13.png');
    case 14:
      return require('../../img/Trombone/14.png');
    case 15:
      return require('../../img/Trombone/15.png');
    case 16:
      return require('../../img/Trombone/16.png');
    case 17:
      return require('../../img/Trombone/17.png');
    case 18:
      return require('../../img/Trombone/18.png');
    case 19:
      return require('../../img/Trombone/19.png');

    // Fast Lip Slurs
    case 21:
      return require('../../img/Trombone/21.png');
    case 22:
      return require('../../img/Trombone/22.png');
    case 23:
      return require('../../img/Trombone/23.png');
    case 24:
      return require('../../img/Trombone/24.png');
    case 25:
      return require('../../img/Trombone/25.png');
    case 26:
      return require('../../img/Trombone/26.png');
    case 27:
      return require('../../img/Trombone/27.png');

    // Articulation
    case 30:
      return require('../../img/Trombone/30.png');
    case 31:
      return require('../../img/Trombone/31.png');
    case 32:
      return require('../../img/Trombone/32.png');
    case 33:
      return require('../../img/Trombone/33.png');
    case 34:
      return require('../../img/Trombone/34.png');
    case 35:
      return require('../../img/Trombone/35.png');
    case 36:
      return require('../../img/Trombone/36.png');
    case 37:
      return require('../../img/Trombone/37.png');
    case 38:
      return require('../../img/Trombone/38.png');

    // Coordination
    case 40:
      return require('../../img/Trombone/40.png');
    case 41:
      return require('../../img/Trombone/41.png');
    case 42:
      return require('../../img/Trombone/42.png');
    case 43:
      return require('../../img/Trombone/43.png');
    case 44:
      return require('../../img/Trombone/44.png');
    case 45:
      return require('../../img/Trombone/45.png');
    case 46:
      return require('../../img/Trombone/46.png');

    // Major Scales
    case 50:
      return require('../../img/Trombone/50.png');
    case 51:
      return require('../../img/Trombone/51.png');
    case 52:
      return require('../../img/Trombone/52.png');
    case 53:
      return require('../../img/Trombone/53.png');
    case 54:
      return require('../../img/Trombone/54.png');
    case 55:
      return require('../../img/Trombone/55.png');
    case 56:
      return require('../../img/Trombone/56.png');
    case 57:
      return require('../../img/Trombone/57.png');
    case 58:
      return require('../../img/Trombone/58.png');
    case 59:
      return require('../../img/Trombone/59.png');
    case 60:
      return require('../../img/Trombone/60.png');
    case 61:
      return require('../../img/Trombone/61.png');

    // High Range
    case 70:
      return require('../../img/Trombone/70.png');
    case 71:
      return require('../../img/Trombone/71.png');
    case 72:
      return require('../../img/Trombone/72.png');
    case 73:
      return require('../../img/Trombone/73.png');
    case 74:
      return require('../../img/Trombone/74.png');
    case 75:
      return require('../../img/Trombone/75.png');
    case 76:
      return require('../../img/Trombone/76.png');
    case 77:
      return require('../../img/Trombone/77.png');
    case 78:
      return require('../../img/Trombone/78.png');

    // Low Range
    case 80:
      return require('../../img/Trombone/80.png');
    case 81:
      return require('../../img/Trombone/81.png');
    case 82:
      return require('../../img/Trombone/82.png');
    case 83:
      return require('../../img/Trombone/83.png');
    case 84:
      return require('../../img/Trombone/84.png');
    case 85:
      return require('../../img/Trombone/85.png');
    case 86:
      return require('../../img/Trombone/86.png');
    case 87:
      return require('../../img/Trombone/87.png');

    default:
      return null;
  }
}
