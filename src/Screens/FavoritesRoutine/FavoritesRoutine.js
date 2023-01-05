import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import Routine from '../../Components/Routine/Routine';
import { PreferencesContext } from '../../Model/Preferences';
import { useIdleScreen, shuffle } from '../../utils';

/**
 * @namespace FavoritesRoutine
 */

/**
 * @function FavoritesRoutine
 * @component
 * @description A routine that randomizes the users' favorites and passes
 * the array into Routine.
 * Created 12/22/20
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/4/22
 * @version 1.0.1
 *
 * @example
 * <FavoritesRoutine />
 */
export default function FavoritesRoutine() {
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
}

/**
 * @function generateFavoritesRoutine
 * @description Shuffles the favorites using the Fisher-Yates (aka Knuth)
 * Shuffle. This will not be empty, because that is checked before mounting
 * this component.
 * Created 1/13/21
 * @param {Object} state The array of items to be shuffled.
 * @returns {string[]} A shuffled array of the users' favorites.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/4/23
 * @version 1.1.2
 */
function generateFavoritesRoutine(state) {
  let tempFavorites = shuffle(state.favorites);
  return tempFavorites;
}
