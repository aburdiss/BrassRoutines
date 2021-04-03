import 'react-native';
import React from 'react';
import AddToListButton from './AddToListButton';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders AddToListButton correctly', () => {
  renderer.create(<AddToListButton handler={jest.fn()} />);
});
