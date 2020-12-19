import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import Routine from '../Components/Routine';
import {PreferencesContext} from '../Model/Preferences';
import {
  hornExercises,
  trumpetExercises,
  tromboneExercises,
  euphoniumExercises,
  tubaExercises,
} from '../Model/Model';

// TODO: on mount, check user settings and generate routine. Pass array of numbers into RoutineView.
const DailyRoutine = () => {
  const {state} = useContext(PreferencesContext);
  const [currentRoutine, setCurrentRoutine] = useState([]);
  useEffect(function () {
    setCurrentRoutine(generateDailyRoutine());
  }, []);

  const generateDailyRoutine = () => {
    switch (state.instrument) {
      case 'horn':
        return generateRoutine(state, hornExercises);
      case 'trumpet':
        return generateRoutine(state, trumpetExercises);
      case 'trombone':
        return generateRoutine(state, tromboneExercises);
      case 'euphonium':
        return generateRoutine(state, euphoniumExercises);
      case 'tuba':
        return generateRoutine(state, tubaExercises);
      default:
        throw new Error('Invalid Instrument');
    }
  };

  return (
    <View>
      <Routine exercises={currentRoutine} instrument={state.instrument} />
    </View>
  );
};

const generateRoutine = (state, exercises) => {
  let tempExercise;
  let newRoutine = [];

  // Adds one long tone. Two if Long Routine
  if (state.longTones) {
    newRoutine.push(randomElement(exercises.longTones));
    if (state.routineLength > 1) {
      do {
        tempExercise = randomElement(exercises.longTones);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
  }

  // Adds one slow lip slur. Two if Medium Routine. Three if Long Routine
  if (state.slowLipSlurs) {
    newRoutine.push(randomElement(exercises.slowLipSlurs));
    if (state.routineLength > 0) {
      do {
        tempExercise = randomElement(exercises.slowLipSlurs);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
    if (state.routineLength > 1) {
      do {
        tempExercise = randomElement(exercises.slowLipSlurs);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
  }

  // Adds one fast lip slur. Two if Medium Routine. Three if Long Routine
  if (state.fastLipSlurs) {
    newRoutine.push(randomElement(exercises.fastLipSlurs));
    if (state.routineLength > 0) {
      do {
        tempExercise = randomElement(exercises.fastLipSlurs);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
    if (state.routineLength > 1) {
      do {
        tempExercise = randomElement(exercises.fastLipSlurs);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
  }

  // Adds one articulation. Two if Medium Routine. Three if Long Routine
  if (state.articulation) {
    newRoutine.push(randomElement(exercises.articulation));
    if (state.routineLength > 0) {
      do {
        tempExercise = randomElement(exercises.articulation);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
    if (state.routineLength > 1) {
      do {
        tempExercise = randomElement(exercises.articulation);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
  }

  // Adds one coordination. Two if Medium Routine. Three if Long Routine
  if (state.coordination) {
    newRoutine.push(randomElement(exercises.coordination));
    if (state.routineLength > 0) {
      do {
        tempExercise = randomElement(exercises.coordination);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
    if (state.routineLength > 1) {
      do {
        tempExercise = randomElement(exercises.coordination);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
  }

  // Adds one Major Scale. Two if Long Routine
  if (state.majorScales) {
    newRoutine.push(randomElement(exercises.majorScales));
    if (state.routineLength > 1) {
      do {
        tempExercise = randomElement(exercises.majorScales);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
  }

  // Adds one High Range.
  if (state.highRange) {
    newRoutine.push(randomElement(exercises.highRange));
  }

  // Adds one low range. Two if Long Routine
  if (state.lowRange) {
    newRoutine.push(randomElement(exercises.lowRange));
    if (state.routineLength > 1) {
      do {
        tempExercise = randomElement(exercises.lowRange);
      } while (newRoutine.includes(tempExercise));
      newRoutine.push(tempExercise);
    }
  }

  return newRoutine;
};

/**
 * @description Takes a string array and returns a random element from the
 * input array
 * @author Alexander Burdiss
 * @since 12/18/20
 * @param {[String]} array
 * @returns A random element from the parameter
 */
const randomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export default DailyRoutine;
