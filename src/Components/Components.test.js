import 'react-native';
import React from 'react';
import AddToListButton from './AddToListButton';
import HeaderButton from './HeaderButton';
import HomeButton from './HomeButton';
import MainActionButton from './MainActionButton';
import ResetButton from './ResetButton';
import Routine from './Routine';
import ZoomModal from './ZoomModal';
import MockNavigator from '../../jest/MockNavigator';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders AddToListButton correctly', () => {
  renderer.create(<AddToListButton handler={jest.fn()} />);
});

it('renders HeaderButton correctly', () => {
  renderer.create(
    <HeaderButton handler={jest.fn()}>Hello, World!</HeaderButton>,
  );
});

it('renders HomeButton correctly', () => {
  renderer.create(<HomeButton onPress={jest.fn()}>Hello, World!</HomeButton>);
});

it('renders MainActionButton correctly', () => {
  renderer.create(
    <MainActionButton handler={jest.fn()}>Hello, World!</MainActionButton>,
  );
});

it('renders ResetButton correctly', () => {
  renderer.create(<ResetButton handler={jest.fn()} />);
});

// it('renders Routine correctly', () => {
//   renderer.create(<MockNavigator component={Routine} />);
// });

// it('renders ZoomModal correctly', () => {
//   renderer.create(
//     <ZoomModal
//       imagePath={null}
//       zoomModalIsShowing={true}
//       setZoomModalIsShowing={jest.fn()}
//     />,
//   );
// });
