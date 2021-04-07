import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import List from './List';
import MockContext from '../../../jest/MockContext';

it('SwipeableRow renders correctly', () => {
  render(
    <MockContext>
      <List />
    </MockContext>,
  );
});
