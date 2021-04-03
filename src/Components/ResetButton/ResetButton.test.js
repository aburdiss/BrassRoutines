import 'react-native';
import React from 'react';
import ResetButton from './ResetButton';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders ResetButton correctly', () => {
  renderer.create(<ResetButton handler={jest.fn()} />);
});
