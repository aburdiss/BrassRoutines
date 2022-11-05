import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import Routine from './Routine';
import MockContext from '../../../jest/MockContext';

it('renders Routine correctly', () => {
  render(
    <MockContext>
      <Routine exercises={[1, 2, 3, 4, 5]} />
    </MockContext>,
  );
});
