import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from '../utils';

import Settings from '../Screens/Settings/Settings';
import Licenses from '../Screens/Licenses/Licenses';
import Acknowledgements from '../Screens/Acknowledgements/Acknowledgements';

import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';

const Stack = createStackNavigator();

/**
 * @function SettingsStack
 * @component
 * @description Currently contains the settings of the app, but more resources,
 * such as fingering charts could be added here.
 * Created 12/2/20
 * @param {Object} props JSX props passed to this React component
 * @param {Object} navigation The navigation object provided by React
 * Navigation
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.0.1
 *
 * @example
 * <Tab.Screen
 *   name="Settings"
 *   component={SettingsStack}
 *   options={{title: translate('Settings')}}
 * />
 */
export default function SettingsStack({ navigation }) {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate('Back'),
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: translate('Settings'),
        }}
      />
      <Stack.Screen
        name="Licenses"
        component={Licenses}
        options={{
          title: translate('Licenses'),
        }}
      />
      <Stack.Screen
        name="Acknowledgements"
        component={Acknowledgements}
        options={{
          title: translate('Acknowledgements'),
        }}
      />
    </Stack.Navigator>
  );
}
