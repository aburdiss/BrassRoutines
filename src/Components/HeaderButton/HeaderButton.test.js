import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import HeaderButton from './HeaderButton';

it('renders HeaderButton correctly', () => {
  render(<HeaderButton handler={jest.fn()}>Hello, World!</HeaderButton>);
});
