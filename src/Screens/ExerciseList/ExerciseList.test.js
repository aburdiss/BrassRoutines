import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ExerciseList from './ExerciseList';
import MockContext from '../../../jest/MockContext';

it('ExerciseList renders correctly', () => {
  render(
    <MockContext>
      <ExerciseList />
    </MockContext>,
  );
});
