import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import MockContext from '../../../../jest/MockContext';

import LinkListItem from './LinkListItem';

test('LinkListItem renders correctly', () => {
  render(
    <MockContext>
      <LinkListItem />
    </MockContext>,
  );
});
