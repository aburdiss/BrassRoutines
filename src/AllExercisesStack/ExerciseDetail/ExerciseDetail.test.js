import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ExerciseDetail from './ExerciseDetail';
import MockContext from '../../../jest/MockContext';

it('ExerciseDetail renders correctly', () => {
  render(
    <MockContext>
      <ExerciseDetail />
    </MockContext>,
  );
});
