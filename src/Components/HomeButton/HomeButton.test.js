import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import HomeButton from './HomeButton';

it('renders HomeButton correctly', () => {
  render(<HomeButton onPress={jest.fn()}>Hello, World!</HomeButton>);
});
