import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDarkMode} from 'react-native-dynamic';
import SafeAreaView from 'react-native-safe-area-view';

import HomeButton from './Components/HomeButton';
import {colors} from './Model/Model';
import {PreferencesContext} from './Model/Preferences';
import {translate} from './Translations/TranslationModel';

const Home = () => {
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

  /**
   * @description Launches the main function of the app, the daily routine.
   * This function checks to make sure the configuration will allow a daily
   * routine to exist, and will alert the user if not, and will not allow them
   * to navigate if not.
   * @author Alexander Burdiss
   * @since 1/3/21
   */
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
        translate('No Exercise Types Selected!'),
        translate('Please select at least one exercise'),
        [
          {
            text: translate('Return'),
            style: 'cancel',
          },
          {
            text: translate('Go to Settings'),
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

  /**
   * @description Launches a daily routine with the favorites the user has
   * selected.
   * @author Alexander Burdiss
   * @since 1/3/21
   */
  const launchFavoritesRoutine = () => {
    if (state.favorites.length === 0) {
      Alert.alert(translate('No Favorites Selected!'));
    } else {
      navigation.navigate('Favorites Routine');
    }
  };

  /**
   * @description Capitalizes the first letter of a word. Used to take the
   * instrument name in state and pass it into the translate funciton.
   * https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
   * @author Alexander Burdiss
   * @since 1/3/21
   */
  const capitalize = (input) => {
    if (typeof input !== 'string') {
      return '';
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
      }}>
      <HomeButton onPress={launchDailyRoutine}>
        {translate('Begin Routine') +
          ' (' +
          translate(capitalize(state?.instrument)) +
          ')'}
      </HomeButton>
      <HomeButton onPress={launchFavoritesRoutine}>
        {translate('Randomize Favorites')}
      </HomeButton>
      <HomeButton
        onPress={() => {
          navigation.navigate('Scale Practice');
        }}>
        {translate('Scale Practice')}
      </HomeButton>
    </SafeAreaView>
  );
};

export default Home;
