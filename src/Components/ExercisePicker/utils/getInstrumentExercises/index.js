import {
  allHornExercises,
  allTrumpetExercises,
  allTromboneExercises,
  allEuphoniumExcercises,
  allTubaExercises,
} from '../../../../Model/Model';

/**
 * @function getInstrumentExercises
 * @memberof ExercisePicker
 * @description Gets the proper list of exercises depending on the selected
 * instrument
 * Created 1/13/21
 * @param {Object} state The current app state.
 * @returns {number[]} An array of all instrument exercises for the currently
 * selected instrument.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.1.3
 */
export function getInstrumentExercises(state) {
  switch (state.instrument) {
    case 'horn':
      return allHornExercises;
    case 'trumpet':
      return allTrumpetExercises;
    case 'trombone':
      return allTromboneExercises;
    case 'euphonium':
      return allEuphoniumExcercises;
    case 'tuba':
      return allTubaExercises;
    default:
      throw new Error('Invalid Instrument');
  }
}
