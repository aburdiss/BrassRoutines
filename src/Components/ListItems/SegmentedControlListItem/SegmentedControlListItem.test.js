import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import MockContext from '../../../../jest/MockContext';

import SegmentedControlListItem from './SegmentedControlListItem';

test('SegmentedControlListItem renders correctly', () => {
  render(
    <MockContext>
      <SegmentedControlListItem />
    </MockContext>,
  );
});
