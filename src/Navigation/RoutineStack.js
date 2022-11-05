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
 * @description Displays main functionality of the app, option to start a
 * daily routine, or an option to start a routine of all of the user's
 * favorites.
 * @author Alexander Burdiss
 * @since 12/2/20
 * @version 1.0.1
 * @param {Object} navigation The navigation object provided by React
 * Navigation
 *
 * @component
 * @example
 * ```jsx
<Tab.Screen
  name="Home"
  component={HomeStack}
  options={{title: translate('Routine')}}
/>
```
 */
const RoutineStack = ({ navigation }) => {
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
};

export default RoutineStack;
