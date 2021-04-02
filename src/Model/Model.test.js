import 'react-native';
import React from 'react';

import {
  allHornExercises,
  allTrumpetExercises,
  allTromboneExercises,
  allEuphoniumExcercises,
  allTubaExercises,
  getHornImagePath,
  getTrumpetImagePath,
  getTromboneImagePath,
  getTromboneBassClefOnlyImagePath,
  getEuphoniumBassClefImagePath,
  getEuphoniumTrebleClefImagePath,
  getTubaImagePath,
} from './Model';

import {
  INSTRUMENT,
  ROUTINE,
  FAVORITES,
  CUSTOM_ROUTINES,
  RESOURCES,
  ABOUT,
} from './SettingsModel';

test.each(allHornExercises)('horn excercises have path', (item) => {
  expect(getHornImagePath(item)).not.toBe(null);
});

test.each(allTrumpetExercises)('trumpet exercises have path', (item) => {
  expect(getTrumpetImagePath(item)).not.toBe(null);
});

test.each(allTromboneExercises)('trombone exercises have path', (item) => {
  expect(getTromboneImagePath(item)).not.toBe(null);
});

test.each(allTromboneExercises)(
  'trombone bass clef exercises have path',
  (item) => {
    expect(getTromboneBassClefOnlyImagePath(item)).not.toBe(null);
  },
);

test.each(allEuphoniumExcercises)(
  'euphonium treble clef exercises have path',
  (item) => {
    expect(getEuphoniumTrebleClefImagePath(item)).not.toBe(null);
  },
);

test.each(allEuphoniumExcercises)(
  'euphonium bass clef exercises have path',
  (item) => {
    expect(getEuphoniumBassClefImagePath(item)).not.toBe(null);
  },
);

test.each(allTubaExercises)('tuba exercises have path', (item) => {
  expect(getTubaImagePath(item)).not.toBe(null);
});

(function checkIfAllIDsAreUnique() {
  let allSettingsItems = [
    ...INSTRUMENT,
    ...ROUTINE,
    ...FAVORITES,
    ...CUSTOM_ROUTINES,
    ...RESOURCES,
    ...ABOUT,
  ];
  let IDs = [];
  let duplicatedItem = false;

  for (let item of allSettingsItems) {
    if (IDs.includes(item.id)) {
      duplicatedItem = item.id;
      break;
    } else {
      IDs.push(item.id);
    }
  }
  expect(duplicatedItem).not.toBeTruthy();
})();

// it('has all valid links', async () => {
//   expect.assertions(RESOURCES.length);

//   console.log(RESOURCES);
//   for (let item of RESOURCES) {
//     let response = await fetch(item.link);
//     expect(response.status).toBe('200');
//   }
// });
