import { getEuphoniumTrebleClefImagePath } from './index';
import { allEuphoniumExcercises } from '../../Model/Model';

test.each(allEuphoniumExcercises)(
  'euphonium treble clef exercises have path',
  (item) => {
    expect(getEuphoniumTrebleClefImagePath(item)).not.toBe(null);
  },
);
