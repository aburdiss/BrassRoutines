import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import Acknowledgements from './Acknowledgements';
import MockContext from '../../../jest/MockContext';

it('Acknowledgements renders correctly', () => {
  render(
    <MockContext>
      <Acknowledgements />
    </MockContext>,
  );
});
