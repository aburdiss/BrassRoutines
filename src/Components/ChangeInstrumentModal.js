import React, {useContext, useEffect, useState} from 'react';
import {View, Image, Alert, Pressable, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import {useDarkMode} from 'react-native-dynamic';
import {PreferencesContext} from '../Model/Preferences';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  colors,
  getHornImagePath,
  getTrumpetImagePath,
  getTromboneImagePath,
  getEuphoniumBassClefImagePath,
  getEuphoniumTrebleClefImagePath,
  getTubaImagePath,
} from '../Model/Model';
import ZoomModal from '../Components/ZoomModal';
import {translate} from '../Translations/TranslationModel';
import InstrumentButton from '../Components/InstrumentButton';

const ChangeInstrumentModal = ({
  changeInstrumentModalIsShowing,
  setChangeInstrumentModalIsShowing,
}) => {
  const DARKMODE = useDarkMode();
  return (
    <Modal
      isVisible={changeInstrumentModalIsShowing}
      onSwipeComplete={() => setChangeInstrumentModalIsShowing(false)}
      swipeDirection={['down']}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={() => setChangeInstrumentModalIsShowing(false)}>
      <SafeAreaView
        style={{
          backgroundColor: DARKMODE ? colors.systemGray5Dark : colors.white,
          width: '100%',
          marginHorizontal: 0,
        }}>
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
      </SafeAreaView>
    </Modal>
  );
};

export default ChangeInstrumentModal;
