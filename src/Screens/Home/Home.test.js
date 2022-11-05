import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import Home from './Home';
import MockContext from '../../../jest/MockContext';

it('Home renders correctly', () => {
  render(
    <MockContext>
      <Home />
    </MockContext>,
  );
});
