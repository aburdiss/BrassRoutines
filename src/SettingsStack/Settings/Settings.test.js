import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import Settings from './Settings';
import MockContext from '../../../jest/MockContext';

it('Settings renders correctly', () => {
  render(
    <MockContext>
      <Settings />
    </MockContext>,
  );
});
