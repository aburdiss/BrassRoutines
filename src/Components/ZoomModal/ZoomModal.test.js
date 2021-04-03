import 'react-native';
import React from 'react';
import ZoomModal from './ZoomModal';
import MockContext from '../../../jest/MockContext';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders ZoomModal correctly', () => {
  renderer.create(
    <MockContext>
      <ZoomModal
        imagePath={null}
        zoomModalIsShowing={true}
        setZoomModalIsShowing={jest.fn()}
      />
    </MockContext>,
  );
});
