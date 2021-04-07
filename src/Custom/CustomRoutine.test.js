import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import CustomRoutine from './CustomRoutine';
import MockContext from '../../jest/MockContext';

it('CustomRoutine renders correctly', () => {
  render(
    <MockContext>
      <CustomRoutine />
    </MockContext>,
  );
});
