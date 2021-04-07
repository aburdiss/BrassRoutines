import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import AllScalesbutton from './AllScalesbutton';
import MockContext from '../../../../jest/MockContext';

it('AllScalesbutton renders correctly', () => {
  render(
    <MockContext>
      <AllScalesbutton />
    </MockContext>,
  );
});
