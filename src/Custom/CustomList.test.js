import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import CustomList from './CustomList';
import MockContext from '../../jest/MockContext';

it('CustomList renders correctly', () => {
  render(
    <MockContext>
      <CustomList />
    </MockContext>,
  );
});
