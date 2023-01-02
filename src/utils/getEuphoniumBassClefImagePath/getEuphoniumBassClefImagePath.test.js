import { getEuphoniumBassClefImagePath } from './index';
import { allEuphoniumExcercises } from '../../Model/Model';

test.each(allEuphoniumExcercises)(
  'euphonium bass clef exercises have path',
  (item) => {
    expect(getEuphoniumBassClefImagePath(item)).not.toBe(null);
  },
);
