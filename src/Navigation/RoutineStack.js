import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from '../utils';

import Home from '../Screens/Home/Home';
import DailyRoutine from '../Screens/DailyRoutine/DailyRoutine';
import FavoritesRoutine from '../Screens/FavoritesRoutine/FavoritesRoutine';
import ScalePractice from '../Screens/ScalePractice/ScalePractice';
import ArpeggioPractice from '../Screens/ArpeggioPractice/ArpeggioPractice';
import HeaderButton from '../Components/HeaderButton/HeaderButton';

import { translate } from '../Translations/TranslationModel';
import { colors } from '../Model/Model';

const Stack = createStackNavigator();

/**
 * @function RoutineStack
 * @component
 * @description Displays main functionality of the app, option to start a
 * daily routine, or an option to start a routine of all of the user's
 * favorites.
 * Created 12/2/20
 * @param {Object} props JSX props passed to this React component
 * @param {Object} navigation The navigation object provided by React
 * Navigation
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.0.2
 *
 * @example
 * <Tab.Screen
 *   name="Home"
 *   component={HomeStack}
 *   options={{title: translate('Routine')}}
 * />
 */
export default function RoutineStack({ navigation }) {
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
        name="Home"
        component={Home}
        options={{
          title: translate('Brass Routines'),
        }}
      />
      <Stack.Screen name="Daily Routine" component={DailyRoutine} />
      <Stack.Screen name="Favorites Routine" component={FavoritesRoutine} />
      <Stack.Screen
        name="Scale Practice"
        component={ScalePractice}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Arpeggio Practice');
              }}
            >
              Arpeggios
            </HeaderButton>
          ),
          title: translate('Scale Practice'),
        }}
      />
      <Stack.Screen
        name="Arpeggio Practice"
        component={ArpeggioPractice}
        options={{
          title: translate('Arpeggio Practice'),
        }}
      />
    </Stack.Navigator>
  );
}
