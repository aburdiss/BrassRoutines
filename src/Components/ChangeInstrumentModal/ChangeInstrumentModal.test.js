import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ChangeInstrumentModal from './ChangeInstrumentModal';
import MockContext from '../../../jest/MockContext';

test('changeInstrumentModal renders correctly', () => {
  render(
    <MockContext>
      <ChangeInstrumentModal isShowing={true} setIsShowing={jest.fn()} />
    </MockContext>,
  );
});
