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

  const styles = {
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    modalInnerWrapper: {
      backgroundColor: DARKMODE ? colors.systemGray5Dark : colors.white,
      width: '100%',
      marginHorizontal: 0,
      paddingBottom: insets.bottom,
    },
  };

  return (
    <Modal
      isVisible={changeInstrumentModalIsShowing}
      onSwipeComplete={() => setChangeInstrumentModalIsShowing(false)}
      swipeDirection={['down']}
      style={styles.modal}
      onBackdropPress={() => setChangeInstrumentModalIsShowing(false)}
    >
      <View style={styles.modalInnerWrapper} mode="margin">
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
