import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkMode } from '../utils';

import ExerciseDetail from '../AllExercisesStack/ExerciseDetail/ExerciseDetail';
import CreateCustom from '../CustomStack/CreateCustom/CreateCustom';
import CustomList from '../CustomStack/CustomList/CustomList';
import CustomRoutine from '../CustomStack/CustomRoutine/CustomRoutine';
import HeaderButton from '../Components/HeaderButton/HeaderButton';

import { PreferencesContext } from '../Model/Preferences';
import { translate } from '../Translations/TranslationModel';
import { colors, getExerciseDisplayName } from '../Model/Model';

const Stack = createStackNavigator();

/**
 * @description Contains all of the screens necessary for the user to create
 * their own routine, and save it to local storage.
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
  name="Custom"
  component={CustomStack}
  options={{title: translate('Custom')}}
/>
 ```
 */
const CustomStack = ({ navigation }) => {
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
        name="Custom List"
        component={CustomList}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Create Custom');
              }}
            >
              Create
            </HeaderButton>
          ),
          title: translate('Custom Routines'),
        }}
      />
      <Stack.Screen
        name="Create Custom"
        component={CreateCustom}
        options={{
          title: translate('Create Routine'),
        }}
      />
      <Stack.Screen
        name="Custom Routine"
        component={CustomRoutine}
        options={{
          title: translate('Custom Routine'),
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
};

export default CustomStack;
