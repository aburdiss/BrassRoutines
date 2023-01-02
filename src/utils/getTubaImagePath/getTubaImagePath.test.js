import { getTubaImagePath } from './index';
import { allTubaExercises } from '../../Model/Model';

test.each(allTubaExercises)('tuba exercises have path', (item) => {
  expect(getTubaImagePath(item)).not.toBe(null);
});
