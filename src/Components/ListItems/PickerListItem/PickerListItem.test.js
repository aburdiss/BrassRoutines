import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import MockContext from '../../../../jest/MockContext';

import PickerListItem from './PickerListItem';

test('PickerListItem renders correctly', () => {
  render(
    <MockContext>
      <PickerListItem />
    </MockContext>,
  );
});
