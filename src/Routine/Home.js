import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import HomeButton from '../Components/HomeButton';
import SafeAreaView from 'react-native-safe-area-view';

import {colors} from '../Model/Model';

const Home = () => {
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();

  const launchDailyRoutine = () => {
    navigation.navigate('Daily Routine');
  };

  const launchFavoritesRoutine = () => {
    navigation.navigate('Favorites Routine');
  };

  return (
    <SafeAreaView>
      <HomeButton onPress={launchDailyRoutine}>Begin Routine</HomeButton>
      <HomeButton onPress={launchFavoritesRoutine}>
        Randomize Favorites
      </HomeButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
