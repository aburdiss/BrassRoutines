import 'react-native';
import React from 'react';
import ScalePractice from '../../src/Scales/ScalePractice';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<ScalePractice />);
});
