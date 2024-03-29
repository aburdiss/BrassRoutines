import React, { useContext, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ScrollView } from 'react-native-gesture-handler';

import { useDarkMode, capitalize } from '../../utils';

import { colors } from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';
import HomeButton from '../../Components/HomeButton/HomeButton';
import ChangeInstrumentModal from '../../Components/ChangeInstrumentModal/ChangeInstrumentModal';

/**
 * @namespace Home
 */

/**
 * @function Home
 * @memberof Home
 * @component
 * @description The initial view when the app starts.
 * Created 12/3/20
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/4/23
 * @version 1.2.1
 *
 * @example
 * <Home />
 */
export default function Home() {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
  });

  const navigation = useNavigation();
  const { state } = useContext(PreferencesContext);
  const [changeInstrumentModalIsShowing, setChangeInstrumentModalIsShowing] =
    useState(false);

  /**
   * @function launchDailyRoutine
   * @memberof Home
   * @description Launches the main function of the app, the daily routine.
   * This function checks to make sure the configuration will allow a daily
   * routine to exist, and will alert the user if not, and will not allow them
   * to navigate if not.
   * Created 1/3/21
   *
   * @copyright 2023 Alexander Burdiss
   * @author Alexander Burdiss
   * @since 1/4/23
   * @version 1.0.2
   */
  function launchDailyRoutine() {
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
  }

  /**
   * @function launchFavoritesRoutine
   * @memberof Home
   * @description Launches a daily routine with the favorites the user has
   * selected.
   * Created 1/3/21
   *
   * @copyright 2023 Alexander Burdiss
   * @author Alexander Burdiss
   * @since 1/4/23
   * @version 1.0.2
   */
  function launchFavoritesRoutine() {
    if (state.favorites.length === 0) {
      Alert.alert(translate('No Favorites Selected!'));
    } else {
      navigation.navigate('Favorites Routine');
    }
  }

  /**
   * @function triggerHapticFeedback
   * @memberof Home
   * @description Triggers the standard haptic feedback option.
   * Created 2/8/21
   *
   * @copyright 2023 Alexander Burdiss
   * @author Alexander Burdiss
   * @since 1/4/23
   * @version 1.0.1
   */
  function triggerHapticFeedback() {
    ReactNativeHapticFeedback.trigger('selection', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView>
        <HomeButton
          accessibilityHint={translate('Starts daily routine')}
          onPress={launchDailyRoutine}
          onLongPress={() => {
            setChangeInstrumentModalIsShowing(true);
            triggerHapticFeedback();
          }}
        >
          {translate('Begin Routine') +
            ' (' +
            translate(capitalize(state?.instrument)) +
            ')'}
        </HomeButton>
        <HomeButton
          accessibilityHint={translate('Randomizes favorite exercises')}
          onPress={launchFavoritesRoutine}
        >
          {translate('Randomize Favorites')}
        </HomeButton>
        <HomeButton
          accessibilityHint={translate('Opens Scale Practice')}
          onPress={() => {
            navigation.navigate('Scale Practice');
          }}
        >
          {translate('Scale Practice')}
        </HomeButton>
      </ScrollView>
      <ChangeInstrumentModal
        isShowing={changeInstrumentModalIsShowing}
        setIsShowing={setChangeInstrumentModalIsShowing}
      />
    </SafeAreaView>
  );
}
