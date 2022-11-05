import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ScaleDisplay from './ScaleDisplay';
import MockContext from '../../../../jest/MockContext';

it('ScaleDisplay renders correctly', () => {
  render(
    <MockContext>
      <ScaleDisplay />
    </MockContext>,
  );
});
