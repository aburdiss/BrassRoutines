import 'react-native-gesture-handler';
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDarkMode} from 'react-native-dynamic';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';

import Home from './src/Home';
import DailyRoutine from './src/Routine/DailyRoutine';
import FavoritesRoutine from './src/Routine/FavoritesRoutine';
import ScalePractice from './src/Scales/ScalePractice';
import ArpeggioPractice from './src/Scales/ArpeggioPractice';
import List from './src/List/List';
import ExerciseDetail from './src/List/ExerciseDetail';
import CreateCustom from './src/Custom/CreateCustom';
import CustomList from './src/Custom/CustomList';
import CustomRoutine from './src/Custom/CustomRoutine';
import Settings from './src/Settings/Settings';

import HeaderButton from './src/Components/HeaderButton';

import {PreferencesContext, PreferencesProvider} from './src/Model/Preferences';
import {setI18nConfig, translate} from './src/Translations/TranslationModel';
import {colors, getExerciseDisplayName} from './src/Model/Model';
import Licenses from './src/Settings/Licenses';
import Acknowledgements from './src/Settings/Acknowledgements';

const Tab = createBottomTabNavigator();
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
const HomeStack = ({navigation}) => {
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
      }}>
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
              }}>
              Arpeggios
            </HeaderButton>
          ),
          title: translate('Scale Practice'),
        }}
      />
      <Stack.Screen name="Arpeggio Practice" component={ArpeggioPractice} />
    </Stack.Navigator>
  );
};

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
const ListStack = ({navigation}) => {
  const {state} = useContext(PreferencesContext);
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
      }}>
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
        options={({route}) => ({
          title: getExerciseDisplayName(route.params.item, state),
        })}
      />
    </Stack.Navigator>
  );
};

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
const CustomStack = ({navigation}) => {
  const {state} = useContext(PreferencesContext);
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
      }}>
      <Stack.Screen
        name="Custom List"
        component={CustomList}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Create Custom');
              }}>
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
        options={({route}) => ({
          title: getExerciseDisplayName(route.params.item, state),
        })}
      />
    </Stack.Navigator>
  );
};

/**
 * @description Currently contains the settings of the app, but more resources,
 * such as fingering charts could be added here.
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
  name="Settings"
  component={SettingsStack}
  options={{title: translate('Settings')}}
/>
 ```
 */
const SettingsStack = ({navigation}) => {
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
      }}>
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
};

setI18nConfig();

/**
 * @description The main tab navigation of the app.
 * @author Alexander Burdiss
 * @since 12/2/20
 * @version 1.0.1
 * 
 * @component
 * @example
 * ```jsx
<App />
```
 */
const App = () => {
  const DARKMODE = useDarkMode();

  useEffect(
    /**
     * @function App~useEffect~updateLocalizationOnChange
     * @description On App mount and unmount, check to see if the localization
     * has changed, and translate the app accordingly
     * @author Alexander Burdiss
     * @since 1/3/21
     * @version 1.0.1
     * @returns {Function} A callback to clean up the localization settings on
     * component unmount.
     */
    function updateLocalizationOnChange() {
      RNLocalize.addEventListener('change', handleLocalizationChange);
      return () => {
        RNLocalize.removeEventListener('change', handleLocalizationChange);
      };
    },
    [],
  );

  /**
   * @function App~handleLocalizationChange
   * @description Updates internationalization settings in the app.
   * @author Alexander Burdiss
   * @since 1/3/21
   * @version 1.0.1
   */
  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({color, size}) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = 'book';
                } else if (route.name === 'List') {
                  iconName = 'list';
                } else if (route.name === 'Custom') {
                  iconName = 'create';
                } else if (route.name === 'Settings') {
                  iconName = 'options';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: DARKMODE
                ? colors.orangeDark
                : colors.orangeLight,
              inactiveTintColor: colors.systemGray,
              style: {
                backgroundColor: DARKMODE
                  ? colors.systemGray6Dark
                  : colors.white,
                borderTopColor: DARKMODE
                  ? colors.systemGray5Dark
                  : colors.systemGray5Light,
              },
            }}>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{title: translate('Routine')}}
            />
            <Tab.Screen
              name="List"
              component={ListStack}
              options={{title: translate('All Exercises')}}
            />
            <Tab.Screen
              name="Custom"
              component={CustomStack}
              options={{title: translate('Custom')}}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsStack}
              options={{title: translate('Settings')}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PreferencesProvider>
    </SafeAreaProvider>
  );
};

export default App;
