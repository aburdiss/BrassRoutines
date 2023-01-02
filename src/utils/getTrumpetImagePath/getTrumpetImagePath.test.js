import { getTrumpetImagePath } from './index';
import { allTrumpetExercises } from '../../Model/Model';

test.each(allTrumpetExercises)('trumpet exercises have path', (item) => {
  expect(getTrumpetImagePath(item)).not.toBe(null);
});
