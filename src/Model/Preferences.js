import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description Loads Data from Local Storage
 * @author Alexander Burdiss
 * @since 12/11/20
 * @version 1.0
 *
 * @param {String} type Type of data to load.
 */
export async function load(type) {
  try {
    const jsonValue = await AsyncStorage.getItem(type);
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
export async function save(type, data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(type, jsonValue);
  } catch (e) {
    console.log(e);
  }
}
