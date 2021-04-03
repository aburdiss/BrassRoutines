import 'react-native';
import React from 'react';
import HomeButton from './HomeButton';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders HomeButton correctly', () => {
  renderer.create(<HomeButton onPress={jest.fn()}>Hello, World!</HomeButton>);
});
