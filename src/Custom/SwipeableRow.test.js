import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import SwipeableRow from './SwipeableRow';
import MockContext from '../../jest/MockContext';

it('SwipeableRow renders correctly', () => {
  render(
    <MockContext>
      <SwipeableRow />
    </MockContext>,
  );
});
