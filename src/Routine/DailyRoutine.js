import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Routine from '../Components/Routine';
import {tromboneExercises} from '../Model/Model';

const DailyRoutine = () => {
  const [currentRoutine, setCurrentRoutine] = useState(
    tromboneExercises.longTones,
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
