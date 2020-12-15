import React, {createContext, useReducer} from 'react';
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
  switch (action.type) {
    case 'SET_ALL_PREFERENCES':
      return {...action.payload};
    case 'ADD_TO_FAVORITES':
      // TODO: Logic for adding item to favorites
      return {...state, favorites: action.payload};
    case 'REMOVE_FROM_FAVORITES':
      // TODO: Logic for removing item from favorites
      return {...state, favorites: action.payload};
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
};

const PreferencesProvider = ({children}) => {
  const [state, dispatch] = useReducer(preferencesReducer);
  return <PreferencesContext.Provider>{children}</PreferencesContext.Provider>;
};

export {PreferencesContext, PreferencesProvider};
