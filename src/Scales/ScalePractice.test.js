import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ScalePractice from './ScalePractice';
import MockContext from '../../jest/MockContext';

it('renders correctly', () => {
  render(
    <MockContext>
      <ScalePractice />
    </MockContext>,
  );
});
