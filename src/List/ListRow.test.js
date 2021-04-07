import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ListRow from './ListRow';
import MockContext from '../../jest/MockContext';

it('ListRow renders correctly', () => {
  render(
    <MockContext>
      <ListRow />
    </MockContext>,
  );
});
