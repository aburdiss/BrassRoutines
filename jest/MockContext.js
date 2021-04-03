import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PreferencesContext} from '../src/Model/Preferences';

const MockContext = ({children}) => {
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
    <SafeAreaProvider>
      <PreferencesContext.Provider value={{state, dispatch}}>
        {children}
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
};

export default MockContext;
