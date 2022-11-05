import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ResetButton from './ResetButton';

it('renders ResetButton correctly', () => {
  render(<ResetButton handler={jest.fn()} />);
});
