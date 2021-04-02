import 'react-native';
import React from 'react';
import ArpeggioPractice from './ArpeggioPractice';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(
    <SafeAreaProvider>
      <ArpeggioPractice />
    </SafeAreaProvider>,
  );
});
