import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import MockContext from '../../../../jest/MockContext';

import TextListItem from './TextListItem';

test('TextListItem renders correctly', () => {
  render(
    <MockContext>
      <TextListItem />
    </MockContext>,
  );
});
