import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import FavoritesRoutine from './FavoritesRoutine';
import MockContext from '../../../jest/MockContext';

it('FavoritesRoutine renders correctly', () => {
  render(
    <MockContext>
      <FavoritesRoutine />
    </MockContext>,
  );
});
