import { getTromboneImagePath } from './index';
import { allTromboneExercises } from '../../Model/Model';

test.each(allTromboneExercises)('trombone exercises have path', (item) => {
  expect(getTromboneImagePath(item)).not.toBe(null);
});
