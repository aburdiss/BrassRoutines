import 'react-native';
import React from 'react';
import AddToListButton from '../src/Components/AddToListButton';
import HeaderButton from '../src/Components/HeaderButton';
import HomeButton from '../src/Components/HomeButton';
import MainActionButton from '../src/Components/MainActionButton';
import ResetButton from '../src/Components/ResetButton';
import Routine from '../src/Components/Routine';
import ZoomModal from '../src/Components/ZoomModal';
import MockNavigator from '../src/_TestComponents/MockNavigator';

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
