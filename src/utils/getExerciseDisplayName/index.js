import { translate } from '../../Translations/TranslationModel';

/**
 * @function getExerciseDisplayName
 * @description A preprocess function to render The Major Scale Labels
 * correctly for the different instruments and for the different languages.
 * Created 12/17/20
 * @param {string} text Exercise Number to be preprocessed.
 * @returns {string} The exercise name in the correct language
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.0.0
 */
export function getExerciseDisplayName(text, state) {
  switch (state.instrument) {
    case 'trumpet':
      switch (text) {
        case 1:
          return text + ' (' + translate('Remington Pattern') + ')';
        case 5:
          return text + ' (' + translate('Remington Variation') + ')';
        case 50:
          return text + ' (' + translate('C Major') + ')';
        case 51:
          return text + ' (' + translate('D♭ Major') + ')';
        case 52:
          return text + ' (' + translate('D Major') + ')';
        case 53:
          return text + ' (' + translate('E♭ Major') + ')';
        case 54:
          return text + ' (' + translate('E Major') + ')';
        case 55:
          return text + ' (' + translate('F Major') + ')';
        case 56:
          return text + ' (' + translate('F♯ Major') + ')';
        case 57:
          return text + ' (' + translate('G Major') + ')';
        case 58:
          return text + ' (' + translate('A♭ Major') + ')';
        case 59:
          return text + ' (' + translate('A Major') + ')';
        case 60:
          return text + ' (' + translate('B♭ Major') + ')';
        case 61:
          return text + ' (' + translate('B Major') + ')';
        default:
          return text;
      }
    case 'horn':
      switch (text) {
        case 1:
          return text + ' (' + translate('Remington Pattern') + ')';
        case 5:
          return text + ' (' + translate('Remington Variation') + ')';
        case 50:
          return text + ' (' + translate('C Major') + ')';
        case 51:
          return text + ' (' + translate('D♭ Major') + ')';
        case 52:
          return text + ' (' + translate('D Major') + ')';
        case 53:
          return text + ' (' + translate('E♭ Major') + ')';
        case 54:
          return text + ' (' + translate('E Major') + ')';
        case 55:
          return text + ' (' + translate('F Major') + ')';
        case 56:
          return text + ' (' + translate('F♯ Major') + ')';
        case 57:
          return text + ' (' + translate('G Major') + ')';
        case 58:
          return text + ' (' + translate('A♭ Major') + ')';
        case 59:
          return text + ' (' + translate('A Major') + ')';
        case 60:
          return text + ' (' + translate('B♭ Major') + ')';
        case 61:
          return text + ' (' + translate('B Major') + ')';
        default:
          return text;
      }
    case 'trombone':
      switch (text) {
        case 1:
          return text + ' (' + translate('Remington Pattern') + ')';
        case 5:
          return text + ' (' + translate('Remington Variation') + ')';
        case 50:
          return text + ' (' + translate('B♭ Major') + ')';
        case 51:
          return text + ' (' + translate('B Major') + ')';
        case 52:
          return text + ' (' + translate('C Major') + ')';
        case 53:
          return text + ' (' + translate('D♭ Major') + ')';
        case 54:
          return text + ' (' + translate('D Major') + ')';
        case 55:
          return text + ' (' + translate('E♭ Major') + ')';
        case 56:
          return text + ' (' + translate('E Major') + ')';
        case 57:
          return text + ' (' + translate('F Major') + ')';
        case 58:
          return text + ' (' + translate('G♭ Major') + ')';
        case 59:
          return text + ' (' + translate('G Major') + ')';
        case 60:
          return text + ' (' + translate('A♭ Major') + ')';
        case 61:
          return text + ' (' + translate('A Major') + ')';
        case 86:
          return text + ' (' + translate('Low Smears') + ')';
        default:
          return text;
      }
    case 'euphonium':
      if (state.bassClef == 1) {
        switch (text) {
          case 1:
            return text + ' (' + translate('Remington Pattern') + ')';
          case 5:
            return text + ' (' + translate('Remington Variation') + ')';
          case 50:
            return text + ' (' + translate('B♭ Major') + ')';
          case 51:
            return text + ' (' + translate('B Major') + ')';
          case 52:
            return text + ' (' + translate('C Major') + ')';
          case 53:
            return text + ' (' + translate('D♭ Major') + ')';
          case 54:
            return text + ' (' + translate('D Major') + ')';
          case 55:
            return text + ' (' + translate('E♭ Major') + ')';
          case 56:
            return text + ' (' + translate('E Major') + ')';
          case 57:
            return text + ' (' + translate('F Major') + ')';
          case 58:
            return text + ' (' + translate('G♭ Major') + ')';
          case 59:
            return text + ' (' + translate('G Major') + ')';
          case 60:
            return text + ' (' + translate('A♭ Major') + ')';
          case 61:
            return text + ' (' + translate('A Major') + ')';
          default:
            return text;
        }
      } else {
        switch (text) {
          case 1:
            return text + ' (' + translate('Remington Pattern') + ')';
          case 5:
            return text + ' (' + translate('Remington Variation') + ')';
          case 50:
            return text + ' (' + translate('C Major') + ')';
          case 51:
            return text + ' (' + translate('D♭ Major') + ')';
          case 52:
            return text + ' (' + translate('D Major') + ')';
          case 53:
            return text + ' (' + translate('E♭ Major') + ')';
          case 54:
            return text + ' (' + translate('E Major') + ')';
          case 55:
            return text + ' (' + translate('F Major') + ')';
          case 56:
            return text + ' (' + translate('F♯ Major') + ')';
          case 57:
            return text + ' (' + translate('G Major') + ')';
          case 58:
            return text + ' (' + translate('A♭ Major') + ')';
          case 59:
            return text + ' (' + translate('A Major') + ')';
          case 60:
            return text + ' (' + translate('B♭ Major') + ')';
          case 61:
            return text + ' (' + translate('B Major') + ')';
          default:
            return text;
        }
      }
    case 'tuba':
      switch (text) {
        case 1:
          return text + ' (' + translate('Remington Pattern') + ')';
        case 5:
          return text + ' (' + translate('Remington Variation') + ')';
        case 50:
          return text + ' (' + translate('B♭ Major') + ')';
        case 51:
          return text + ' (' + translate('B Major') + ')';
        case 52:
          return text + ' (' + translate('C Major') + ')';
        case 53:
          return text + ' (' + translate('D♭ Major') + ')';
        case 54:
          return text + ' (' + translate('D Major') + ')';
        case 55:
          return text + ' (' + translate('E♭ Major') + ')';
        case 56:
          return text + ' (' + translate('E Major') + ')';
        case 57:
          return text + ' (' + translate('F Major') + ')';
        case 58:
          return text + ' (' + translate('G♭ Major') + ')';
        case 59:
          return text + ' (' + translate('G Major') + ')';
        case 60:
          return text + ' (' + translate('A♭ Major') + ')';
        case 61:
          return text + ' (' + translate('A Major') + ')';
        default:
          return text;
      }
    default:
      throw new Error('Invalid Instrument Name');
  }
}
