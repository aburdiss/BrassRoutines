import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import LicensesList from './LicensesList';
import MockContext from '../../../jest/MockContext';

it('LicensesList renders correctly', () => {
  render(
    <MockContext>
      <LicensesList />
    </MockContext>,
  );
});
