import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import MockContext from '../../../../jest/MockContext';

import ButtonListItem from './ButtonListItem';

test('ButtonListItem renders correctly', () => {
  render(
    <MockContext>
      <ButtonListItem />
    </MockContext>,
  );
});
