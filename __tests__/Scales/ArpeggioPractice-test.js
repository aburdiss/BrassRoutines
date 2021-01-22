import 'react-native';
import React from 'react';
import ArpeggioPractice from '../../src/Scales/ArpeggioPractice';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<ArpeggioPractice />);
});
