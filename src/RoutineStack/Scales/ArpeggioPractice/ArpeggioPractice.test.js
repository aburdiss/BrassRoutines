import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ArpeggioPractice from './ArpeggioPractice';
import MockContext from '../../../../jest/MockContext';

it('renders correctly', () => {
  render(
    <MockContext>
      <ArpeggioPractice />
    </MockContext>,
  );
});
