import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from './src/utils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';

import { PreferencesProvider } from './src/Model/Preferences';
import { setI18nConfig, translate } from './src/Translations/TranslationModel';
import { colors } from './src/Model/Model';

import RoutineStack from './src/Navigation/RoutineStack';
import AllExercisesStack from './src/Navigation/AllExercisesStack';
import CustomStack from './src/Navigation/CustomStack';
import SettingsStack from './src/Navigation/SettingsStack';

const Tab = createBottomTabNavigator();

setI18nConfig();

/**
 * @namespace App
 */

/**
 * @function App
 * @component
 * @description The main tab navigation of the app.
 * Created 11/17/20
 *
 * @copyright 2022 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 11/6/22
 * @version 1.0.2
 * @example
 * <App />
 */
export default function App() {
  const DARKMODE = useDarkMode();

  useEffect(
    /**
     * @function updateLocalizationOnChange
     * @memberof App
     * @description On App mount and unmount, check to see if the localization
     * has changed, and translate the app accordingly
     * Created 1/3/21
     * @returns {Function} A callback to clean up the localization settings on
     * component unmount.
     *
     * @author Alexander Burdiss
     * @since 11/6/22
     * @version 1.0.2
     */
    function updateLocalizationOnChange() {
      RNLocalize.addEventListener('change', handleLocalizationChange);
      return function cleanup() {
        RNLocalize.removeEventListener('change', handleLocalizationChange);
      };
    },
    [],
  );

  /**
   * @function handleLocalizationChange
   * @memberof App
   * @description Updates internationalization settings in the app.
   *
   * @author Alexander Burdiss
   * @since 11/6/22
   * @version 1.0.2
   */
  function handleLocalizationChange() {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: function ({ color, size }) {
                let iconName;
                if (route.name === 'HomeStack') {
                  iconName = 'book';
                } else if (route.name === 'ListStack') {
                  iconName = 'list';
                } else if (route.name === 'CustomStack') {
                  iconName = 'create';
                } else if (route.name === 'SettingsStack') {
                  iconName = 'options';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: DARKMODE
                ? colors.orangeDark
                : colors.orangeLight,
              tabBarInactiveTintColor: colors.systemGray,
              tabBarStyle: {
                backgroundColor: DARKMODE
                  ? colors.systemGray6Dark
                  : colors.white,
                borderTopColor: DARKMODE
                  ? colors.systemGray5Dark
                  : colors.systemGray5Light,
              },
              headerShown: false,
            })}
          >
            <Tab.Screen
              name="HomeStack"
              component={RoutineStack}
              options={{ title: translate('Routine') }}
            />
            <Tab.Screen
              name="ListStack"
              component={AllExercisesStack}
              options={{ title: translate('All Exercises') }}
            />
            <Tab.Screen
              name="CustomStack"
              component={CustomStack}
              options={{ title: translate('Custom') }}
            />
            <Tab.Screen
              name="SettingsStack"
              component={SettingsStack}
              options={{ title: translate('Settings') }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}
