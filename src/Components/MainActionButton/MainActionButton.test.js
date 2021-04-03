import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import MainActionButton from './MainActionButton';

it('renders MainActionButton correctly', () => {
  render(
    <MainActionButton handler={jest.fn()}>Hello, World!</MainActionButton>,
  );
});
