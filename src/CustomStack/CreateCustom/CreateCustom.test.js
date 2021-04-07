import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import CreateCustom from './CreateCustom';
import MockContext from '../../../jest/MockContext';

it('CreateCustom renders correctly', () => {
  render(
    <MockContext>
      <CreateCustom />
    </MockContext>,
  );
});
