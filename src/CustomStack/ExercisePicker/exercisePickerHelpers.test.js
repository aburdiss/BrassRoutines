import {
  allHornExercises,
  allTrumpetExercises,
  allTromboneExercises,
  allEuphoniumExcercises,
  allTubaExercises,
} from '../../Model/Model';

import { getInstrumentExercises } from './exercisePickerHelpers';

test('getInstrumentExercises returns correct exercises', () => {
  let hornExercises = getInstrumentExercises({ instrument: 'horn' });
  expect(hornExercises).toEqual(allHornExercises);
  let trumpetExercises = getInstrumentExercises({ instrument: 'trumpet' });
  expect(trumpetExercises).toEqual(allTrumpetExercises);
  let tromboneExercises = getInstrumentExercises({ instrument: 'trombone' });
  expect(tromboneExercises).toEqual(allTromboneExercises);
  let euphoniumExercises = getInstrumentExercises({ instrument: 'euphonium' });
  expect(euphoniumExercises).toEqual(allEuphoniumExcercises);
  let tubaExercises = getInstrumentExercises({ instrument: 'tuba' });
  expect(tubaExercises).toEqual(allTubaExercises);
});
