import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import LicensesListItem from './LicensesListItem';
import MockContext from '../../../jest/MockContext';

it('LicensesListItem renders correctly', () => {
  render(
    <MockContext>
      <LicensesListItem />
    </MockContext>,
  );
});
