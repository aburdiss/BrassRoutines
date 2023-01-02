import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import InstrumentButton from '../InstrumentButton/InstrumentButton';

/**
 * @function ChangeInstrumentModal
 * @component
 * @description A modal that pops up from the bottom of the screen and allows
 * users to change the instrument that they have selected
 * Created 4/3/21
 * @param {Object} props JSX props passed to this React component
 * @param {boolean} props.isShowing Whether this modal is showing
 * @param {Function} props.setIsShowing A function to update the state variable
 * props.isShowing
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 2.0.0
 *
 * @example
 * <ChangeInstrumentModal
 *   isShowing={isShowing}
 *   setIsShowing={setIsShowing}
 * />
 */
export default function ChangeInstrumentModal({ isShowing, setIsShowing }) {
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
      isVisible={isShowing}
      onSwipeComplete={() => setIsShowing(false)}
      swipeDirection={['down']}
      style={styles.modal}
      onBackdropPress={() => setIsShowing(false)}
    >
      <View style={styles.modalInnerWrapper} mode="margin">
        <InstrumentButton text="Horn" setIsShowing={setIsShowing} />
        <InstrumentButton text="Trumpet" setIsShowing={setIsShowing} />
        <InstrumentButton text="Trombone" setIsShowing={setIsShowing} />
        <InstrumentButton text="Euphonium" setIsShowing={setIsShowing} />
        <InstrumentButton text="Tuba" setIsShowing={setIsShowing} />
      </View>
    </Modal>
  );
}
