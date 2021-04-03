import 'react-native';
import React from 'react';
import MainActionButton from './MainActionButton';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders MainActionButton correctly', () => {
  renderer.create(
    <MainActionButton handler={jest.fn()}>Hello, World!</MainActionButton>,
  );
});
