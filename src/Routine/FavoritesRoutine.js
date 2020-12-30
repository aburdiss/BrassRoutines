import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import Routine from '../Components/Routine';
import {PreferencesContext} from '../Model/Preferences';

const FavoritesRoutine = () => {
  const {state} = useContext(PreferencesContext);
  const [currentRoutine, setCurrentRoutine] = useState([]);
  useEffect(function () {
    setCurrentRoutine(generateFavoritesRoutine(state));
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
 * @since 12/21/20
 * @param {[String]} state The array of items to be shuffled.
 */
const generateFavoritesRoutine = (state) => {
  let tempFavorites = [...state.favorites];
  let currentIndex = tempFavorites.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = tempFavorites[currentIndex];
    tempFavorites[currentIndex] = tempFavorites[randomIndex];
    tempFavorites[randomIndex] = temporaryValue;
  }

  return tempFavorites;
};
export default FavoritesRoutine;
