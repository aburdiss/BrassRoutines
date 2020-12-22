import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import HomeButton from '../Components/HomeButton';
import SafeAreaView from 'react-native-safe-area-view';

import {colors} from '../Model/Model';
import {PreferencesContext} from '../Model/Preferences';

const Home = () => {
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

  const launchDailyRoutine = () => {
    if (
      !state.longTones &&
      !state.slowLipSlurs &&
      !state.fastLipSlurs &&
      !state.articulation &&
      !state.coordination &&
      !state.majorScales &&
      !state.highRange &&
      !state.lowRange
    ) {
      Alert.alert(
        'No Exercise Types Selected!',
        'Please select at least one exercise.',
        [
          {
            text: 'Return',
            style: 'cancel',
          },
          {
            text: 'Go to Settings',
            onPress: () => {
              navigation.navigate('Settings');
            },
            style: 'default',
          },
        ],
      );
    } else {
      navigation.navigate('Daily Routine');
    }
  };

  const launchFavoritesRoutine = () => {
    if (state.favorites.length === 0) {
      Alert.alert('No Favorites Selected!', '', [
        {
          text: 'Return',
          style: 'cancel',
        },
      ]);
    } else {
      navigation.navigate('Favorites Routine');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
      }}>
      <HomeButton onPress={launchDailyRoutine}>
        {'Begin Routine (' + state?.instrument + ')'}
      </HomeButton>
      <HomeButton onPress={launchFavoritesRoutine}>
        Randomize Favorites
      </HomeButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
