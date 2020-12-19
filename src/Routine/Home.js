import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
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
    navigation.navigate('Daily Routine');
  };

  const launchFavoritesRoutine = () => {
    navigation.navigate('Favorites Routine');
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
