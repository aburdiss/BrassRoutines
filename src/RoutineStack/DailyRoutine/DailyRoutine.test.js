import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import DailyRoutine from './DailyRoutine';
import MockContext from '../../../jest/MockContext';

it('DailyRoutine renders correctly', () => {
  render(
    <MockContext>
      <DailyRoutine />
    </MockContext>,
  );
});
