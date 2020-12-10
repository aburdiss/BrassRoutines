import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Routine from '../Components/Routine';
import {tromboneExercises} from '../Model/Model';

// TODO: on mount, check user settings and generate routine. Pass array of numbers into RoutineView.
const DailyRoutine = () => {
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

export default DailyRoutine;
