import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import ZoomModal from './ZoomModal';
import MockContext from '../../../jest/MockContext';

it('renders ZoomModal correctly', () => {
  render(
    <MockContext>
      <ZoomModal
        imagePath={null}
        zoomModalIsShowing={true}
        setZoomModalIsShowing={jest.fn()}
      />
    </MockContext>,
  );
});
