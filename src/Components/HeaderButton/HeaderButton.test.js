import 'react-native';
import React from 'react';
import HeaderButton from './HeaderButton';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders HeaderButton correctly', () => {
  renderer.create(
    <HeaderButton handler={jest.fn()}>Hello, World!</HeaderButton>,
  );
});
