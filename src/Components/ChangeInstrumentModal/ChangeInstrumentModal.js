import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import InstrumentButton from '../InstrumentButton/InstrumentButton';

export default function ChangeInstrumentModal({
  changeInstrumentModalIsShowing,
  setChangeInstrumentModalIsShowing,
}) {
  const DARKMODE = useDarkMode();
  const insets = useSafeAreaInsets();
  return (
    <Modal
      isVisible={changeInstrumentModalIsShowing}
      onSwipeComplete={() => setChangeInstrumentModalIsShowing(false)}
      swipeDirection={['down']}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ margin: 0, justifyContent: 'flex-end' }}
      onBackdropPress={() => setChangeInstrumentModalIsShowing(false)}
    >
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: DARKMODE ? colors.systemGray5Dark : colors.white,
          width: '100%',
          marginHorizontal: 0,
          paddingBottom: insets.bottom,
        }}
        mode="margin"
      >
        <InstrumentButton
          text="Horn"
          setIsShowing={setChangeInstrumentModalIsShowing}
        />
        <InstrumentButton
          text="Trumpet"
          setIsShowing={setChangeInstrumentModalIsShowing}
        />
        <InstrumentButton
          text="Trombone"
          setIsShowing={setChangeInstrumentModalIsShowing}
        />
        <InstrumentButton
          text="Euphonium"
          setIsShowing={setChangeInstrumentModalIsShowing}
        />
        <InstrumentButton
          text="Tuba"
          setIsShowing={setChangeInstrumentModalIsShowing}
        />
      </View>
    </Modal>
  );
}
