import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import SwitchRow from './SwitchRow';
import MockContext from '../../jest/MockContext';

it('SwitchRow renders correctly', () => {
  render(
    <MockContext>
      <SwitchRow />
    </MockContext>,
  );
});
