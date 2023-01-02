import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import MockContext from '../../../../jest/MockContext';

import SwitchListItem from './SwitchListItem';

test('SwitchListItem renders correctly', () => {
  render(
    <MockContext>
      <SwitchListItem />
    </MockContext>,
  );
});
