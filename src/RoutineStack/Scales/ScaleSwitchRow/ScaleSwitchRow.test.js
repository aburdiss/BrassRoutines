import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ScaleSwitchRow from './ScaleSwitchRow';
import MockContext from '../../../../jest/MockContext';

it('ScaleSwitchRow renders correctly', () => {
  render(
    <MockContext>
      <ScaleSwitchRow />
    </MockContext>,
  );
});
