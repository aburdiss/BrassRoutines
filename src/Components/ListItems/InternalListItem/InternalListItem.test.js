import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import MockContext from '../../../../jest/MockContext';

import InternalListItem from './InternalListItem';

test('InternalListItem renders correctly', () => {
  render(
    <MockContext>
      <InternalListItem />
    </MockContext>,
  );
});
