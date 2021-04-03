import 'react-native';
import React from 'react';
import Routine from './Routine';
import MockContext from '../../../jest/MockContext';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders Routine correctly', () => {
  renderer.create(
    <MockContext>
      <Routine exercises={[1, 2, 3, 4, 5]} />
    </MockContext>,
  );
});
