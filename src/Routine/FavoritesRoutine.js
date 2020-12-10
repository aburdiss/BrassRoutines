import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Routine from '../Components/Routine';
import {tromboneExercises} from '../Model/Model';

// TODO: Hook this up to the favorites, and randomize through all of them on this component load.
const FavoritesRoutine = () => {
  const [currentRoutine, setCurrentRoutine] = useState(
    tromboneExercises[0].data,
  );
  useEffect(function () {
    // Check userPersonalization here and generate a routine.
  }, []);

  return (
    <View>
      <Routine exercises={currentRoutine} />
    </View>
  );
};

export default FavoritesRoutine;
