import 'react-native';
import React from 'react';
import Licenses from './Licenses';
import data from './Licenses/data';
import json from '../../package.json';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {SafeAreaProvider} from 'react-native-safe-area-context';

it('renders correctly', () => {
  renderer.create(
    <SafeAreaProvider>
      <Licenses />
    </SafeAreaProvider>,
  );
});

test('has all Licenses', () => {
  let processedDependencies = Object.keys(data).length;
  let totalDependencies = Object.keys(json.dependencies).length;
  expect(processedDependencies).toBe(totalDependencies);
});
