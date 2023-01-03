import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @function load
 * @description Loads Data from Local Storage
 * Created 12/11/20
 * @param {string} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.0.3
 */
export async function load() {
  try {
    const jsonValue = await AsyncStorage.getItem('preferences');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function save
 * @description Stores Data in Local Storage
 * Created 12/11/20
 * @param {string} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.0.2
 */
export async function save(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('preferences', jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export const PreferencesContext = createContext();

/**
 * @function preferencesReducer
 * @description A reducer that handles updating the state stored in context,
 * and updates the same state in local storage on the device.
 * Created 12/14/20
 * @param {Object} state The existing State
 * @param {Object} action The new action, with a type and payload
 * @returns {Object} The new state
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.0.1
 */
function preferencesReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'SET_ALL_PREFERENCES':
      newState = { ...state, ...action.payload };
      break;
    case 'ADD_TO_FAVORITES':
      newState = { ...state, favorites: action.payload };
      break;
    case 'ADD_TO_CUSTOM_ROUTINES':
      newState = { ...state, customRoutines: action.payload };
      break;
    case 'REMOVE_FROM_FAVORITES':
      newState = { ...state, favorites: action.payload };
      break;
    case 'SET_SETTING':
      newState = { ...state, ...action.payload };
      break;
    case 'RESET_FAVORITES':
      newState = { ...state, favorites: [] };
      break;
    case 'RESET_CUSTOM_ROUTINES':
      newState = { ...state, customRoutines: [] };
      break;
    case 'RESET_PREFERENCES':
      newState = initialPreferencesState;
      break;
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
  save(newState);
  return newState;
}

const initialPreferencesState = {
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
  keepScreenOn: false,
  routineLength: 1,
  favorites: [],
  customRoutines: [],
};

/**
 * @function PreferencesProvider
 * @component
 * @description Provides the user preferences throughout the app.
 * Created 12/14/20
 * @param {Object} props JSX props passed to this React component
 * @param {*} props.children React Children to render inside this component
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.0.1
 *
 * @example
 * <PreferencesProvider>
 *   {..}
 * </PreferencesProvider>
 */
export function PreferencesProvider({ children }) {
  const [state, dispatch] = useReducer(preferencesReducer);

  useEffect(() => {
    load().then((data) => {
      if (data !== null) {
        dispatch({ type: 'SET_ALL_PREFERENCES', payload: data });
      } else {
        dispatch({
          type: 'SET_ALL_PREFERENCES',
          payload: initialPreferencesState,
        });
      }
    });
  }, []);

  return (
    <PreferencesContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferencesContext.Provider>
  );
}
