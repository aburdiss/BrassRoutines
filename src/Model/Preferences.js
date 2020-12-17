import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description Loads Data from Local Storage
 * @author Alexander Burdiss
 * @since 12/11/20
 * @version 1.0
 *
 * @param {String} type Type of data to load.
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
 * @description Stores Data in Local Storage
 * @author Alexander Burdiss
 * @since 12/11/20
 * @version 1.0
 *
 * @param {String} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 */
export async function save(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('preferences', jsonValue);
  } catch (e) {
    console.log(e);
  }
}

const PreferencesContext = createContext();

const preferencesReducer = (state, action) => {
  console.log(action);
  let newState;
  switch (action.type) {
    case 'SET_ALL_PREFERENCES':
      newState = {...action.payload};
      break;
    case 'ADD_TO_FAVORITES':
      newState = {...state, favorites: action.payload};
      break;
    case 'REMOVE_FROM_FAVORITES':
      newState = {...state, favorites: action.payload};
      break;
    case 'SET_SWITCH':
      newState = {...state, ...action.payload};
      break;
    case 'RESET_FAVORITES':
      newState = {...state, favorites: []};
      break;
    case 'RESET_CUSTOM_ROUTINES':
      newState = {...state, customRoutines: []};
      break;
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
  return newState;
};

const initialPreferencesState = {
  instrument: 'trombone',
  longTones: true,
  slowLipSlurs: true,
  fastLipSlurs: true,
  singleNoteArticulation: true,
  changingNoteArticulation: true,
  majorScales: true,
  highRange: true,
  lowRange: true,
  routineLength: 1,
  favorites: [],
  customRoutines: [],
};

const PreferencesProvider = ({children}) => {
  const [state, dispatch] = useReducer(
    preferencesReducer,
    initialPreferencesState,
  );

  useEffect(() => {
    load().then((data) => {
      console.log(data);
      dispatch({type: 'SET_ALL_PREFERENCES', payload: data});
    });
  }, []);

  return (
    <PreferencesContext.Provider value={{state, dispatch}}>
      {children}
    </PreferencesContext.Provider>
  );
};

export {PreferencesContext, PreferencesProvider};
