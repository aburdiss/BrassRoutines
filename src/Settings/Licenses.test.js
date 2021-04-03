import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import Licenses from './Licenses';
import MockContext from '../../jest/MockContext';
import data from './Licenses/data';
import json from '../../package.json';

it('renders correctly', () => {
  render(
    <MockContext>
      <Licenses />
    </MockContext>,
  );
});

test('has all Licenses', () => {
  let processedDependencies = Object.keys(data).length;
  let totalDependencies = Object.keys(json.dependencies).length;
  expect(processedDependencies).toBe(totalDependencies);
});
