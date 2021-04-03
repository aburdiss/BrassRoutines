import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import AddToListButton from './AddToListButton';

it('renders AddToListButton correctly', () => {
  render(<AddToListButton handler={jest.fn()} />);
});
