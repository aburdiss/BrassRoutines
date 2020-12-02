import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from 'react-native-dynamic'
import * as RNLocalize from 'react-native-localize';


import Home from './src/Routine/Home';
import DailyRoutine from './src/Routine/DailyRoutine';
import FavoritesRoutine from './src/Routine/FavoritesRoutine';
import List from './src/List/List';
import ExerciseDetail from './src/List/ExerciseDetail';
import CreateCustom from './src/Custom/CreateCustom';
import CustomList from './src/Custom/CustomList';
import CustomRoutine from './src/Custom/CustomRoutine';
import Settings from './src/Settings/Settings';

import HeaderButton from './src/Components/HeaderButton';

import { setI18nConfig, translate } from './src/Translations/TranslationModel';
import { colors } from './src/Model/Model';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HomeStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate("Back"),
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          title: translate("Brass Routines")
        }}
      />
      <Stack.Screen 
        name="Daily Routine" 
        component={DailyRoutine}
      />
      <Stack.Screen
        name="Favorites Routine"
        component={FavoritesRoutine}
      />
    </Stack.Navigator>
  )
}


const ListStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate("Back"),
      }}
    >
      <Stack.Screen 
        name="List" 
        component={List}
        options={{
          title: translate("All Exercises"),
        }}
      />
      <Stack.Screen
        name="Exercise Detail"
        component={ExerciseDetail}
        options={({ route }) => ({ 
          title: translate(route.params.name),
        })}
      />
    </Stack.Navigator>
  );
}


const CustomStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate("Back"),
      }}
    >
      <Stack.Screen 
        name="Advanced Scale Practice" 
        component={AdvancedScale}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={()=>{navigation.navigate("Advanced Arpeggio Practice")}}
            >
              {translate("Arpeggios")}
            </HeaderButton>
          ),
          title: translate("Advanced Scale Practice"),
        }}
      />
      <Stack.Screen 
        name="Advanced Arpeggio Practice" 
        component={AdvancedArpeggio}
        options={{
          title: translate("Advanced Arpeggio Practice"),
        }}
      />
    </Stack.Navigator>
  );
}


const SettingsStack = () => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: translate("Back"),
      }}
    >
      <Stack.Screen
        name="More"
        component={More}
        options={{
          title: translate("More"),
        }}
      />
    </Stack.Navigator>
  )
}

setI18nConfig();
/**
 * @description The main tab navigation of the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const App = () => {
  const DARKMODE = useDarkMode();

  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return (() => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    });
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig()
    .then(() => this.forceUpdate())
    .catch(error => {
    console.error(error)
    })
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Random') {
              iconName = 'md-cube';
            } else if (route.name === 'Resources') {
              iconName = 'md-book';
            } else if (route.name === 'Advanced') {
              iconName = 'md-create';
            } else if (route.name === 'More') {
              iconName = 'md-settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
          inactiveTintColor: colors.systemGray,
          style: {
            backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
            borderTopColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          }
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
  );
};

export default App;
