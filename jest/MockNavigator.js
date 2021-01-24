import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PreferencesContext} from '../src/Model/Preferences';

const Stack = createStackNavigator();
const MockedNavigator = ({component, params = {}}) => {
  let state = {
    instrument: 'horn',
    bassClef: 1,
    longTones: true,
    slowLipSlurs: true,
    fastLipSlurs: true,
    articulation: true,
    coordination: true,
    majorScales: true,
    highRange: true,
    lowRange: true,
    routineLength: 1,
    favorites: [],
    customRoutines: [],
  };
  let dispatch = jest.fn();

  return (
    <PreferencesContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MockedScreen"
            component={component}
            initialParams={params}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PreferencesContext.Provider>
  );
};

export default MockedNavigator;
