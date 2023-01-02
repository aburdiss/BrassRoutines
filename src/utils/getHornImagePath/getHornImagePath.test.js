import { getHornImagePath } from './index';
import { allHornExercises } from '../../Model/Model';

test.each(allHornExercises)('horn excercises have path', (item) => {
  expect(getHornImagePath(item)).not.toBe(null);
});
