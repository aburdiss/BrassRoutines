import { getTromboneBassClefOnlyImagePath } from './index';
import { allTromboneExercises } from '../../Model/Model';

test.each(allTromboneExercises)(
  'trombone bass clef exercises have path',
  (item) => {
    expect(getTromboneBassClefOnlyImagePath(item)).not.toBe(null);
  },
);
