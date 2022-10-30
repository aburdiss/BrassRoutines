import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import Routine from '../../Components/Routine/Routine';
import { PreferencesContext } from '../../Model/Preferences';
import { useIdleScreen, shuffle } from '../../utils';

/**
 * @description A routine that randomizes the users' favorites and passes
 * the array into Routine.
 * @author Alexander Burdiss
 * @since 12/22/20
 * @version 1.0.0
 *
 * @component
 * @example
 *   <FavoritesRoutine />
 */
const FavoritesRoutine = () => {
  useIdleScreen();
  const { state } = useContext(PreferencesContext);
  const [currentRoutine, setCurrentRoutine] = useState([]);
  useEffect(function () {
    setCurrentRoutine(generateFavoritesRoutine(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Routine exercises={currentRoutine} />
    </View>
  );
};

/**
 * @description Shuffles the favorites using the Fisher-Yates (aka Knuth)
 * Shuffle. This will not be empty, because that is checked before mounting
 * this component.
 * @author Alexander Burdiss
 * @since 1/13/21
 * @version 1.1.1
 * @param {[String]} state The array of items to be shuffled.
 * @returns {Array} A shuffled array of the users' favorites.
 */
const generateFavoritesRoutine = (state) => {
  let tempFavorites = shuffle(state.favorites);
  return tempFavorites;
};

export default FavoritesRoutine;
