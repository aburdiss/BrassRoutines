import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import IosExercisePicker from './ExercisePicker.ios';
import AndroidExercisePicker from './ExercisePicker.android';
import MockContext from '../../../jest/MockContext';

it('IosExercisePicker renders correctly', () => {
  render(
    <MockContext>
      <IosExercisePicker />
    </MockContext>,
  );
});

it('AndroidExercisePicker', () => {
  render(
    <MockContext>
      <AndroidExercisePicker />
    </MockContext>,
  );
});
