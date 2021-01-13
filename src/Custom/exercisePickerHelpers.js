import {
  allHornExercises,
  allTrumpetExercises,
  allTromboneExercises,
  allEuphoniumExcercises,
  allTubaExercises,
} from '../Model/Model';

/**
 * @function previewExercise
 * @description Opens the Exercise preview for the selected exercise and
 * selected instrument
 * @author Alexander Burdiss
 * @since 1/13/21
 * @version 1.1.0
 */
export const previewExercise = (state, navigation, selectedExercise) => {
  navigation.navigate('Exercise Detail', {
    instrument: state.instrument,
    item: selectedExercise,
  });
};

/**
 * @function getInstrumentExercises
 * @description Gets the proper list of exercises depending on the selected
 * instrument
 * @author Alexander Burdiss
 * @since 1/13/21
 * @version 1.1.0
 */
export const getInstrumentExercises = (state) => {
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
};
