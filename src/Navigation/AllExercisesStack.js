import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from '../utils';

import List from '../Screens/ExerciseList/ExerciseList';
import ExerciseDetail from '../Screens/ExerciseDetail/ExerciseDetail';

import { PreferencesContext } from '../Model/Preferences';
import { translate } from '../Translations/TranslationModel';
import { colors, getExerciseDisplayName } from '../Model/Model';

const Stack = createStackNavigator();

/**
 * @description A stack that shows the list of all of the elements in the app,
 * and can open each element in another screen.
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
  name="List"
  component={ListStack}
  options={{title: translate('All Exercises')}}
/>
```
 */
export default function AllExercisesStack({ navigation }) {
  const { state } = useContext(PreferencesContext);
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
        name="List"
        component={List}
        options={{
          title: translate('All Exercises'),
        }}
      />
      <Stack.Screen
        name="Exercise Detail"
        component={ExerciseDetail}
        options={({ route }) => ({
          title: getExerciseDisplayName(route.params.item, state),
        })}
      />
    </Stack.Navigator>
  );
}
