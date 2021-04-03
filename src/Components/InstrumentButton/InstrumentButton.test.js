import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import InstrumentButton from './InstrumentButton';
import MockContext from '../../../jest/MockContext';

test('renders InstrumentButton correctly', () => {
  render(
    <MockContext>
      <InstrumentButton text={'Hello, world!'} setIsShowing={false} />
    </MockContext>,
  );
});
