import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import CustomListRow from './CustomListRow';
import MockContext from '../../../jest/MockContext';

it('CustomListRow renders correctly', () => {
  render(
    <MockContext>
      <CustomListRow />
    </MockContext>,
  );
});
