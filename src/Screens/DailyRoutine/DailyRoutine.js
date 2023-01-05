import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Routine from '../../Components/Routine/Routine';
import { PreferencesContext } from '../../Model/Preferences';
import {
  hornExercises,
  trumpetExercises,
  tromboneExercises,
  euphoniumExercises,
  tubaExercises,
} from '../../Model/Model';
import { useIdleScreen, random } from '../../utils';

/**
 * @namespace DailyRoutine
 */

/**
 * @function DailyRoutine
 * @memberof DailyRoutine
 * @component
 * @description The main routine of the app, that takes the user's settings and
 * generates a randomized routine based on their preferences.
 * Created 12/18/20
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/4/23
 * @version 1.0.1
 *
 * @example
 * <DailyRoutine />
 */
export default function DailyRoutine() {
  useIdleScreen();
  const { state } = useContext(PreferencesContext);
  const [currentRoutine, setCurrentRoutine] = useState([]);
  useEffect(function () {
    setCurrentRoutine(generateDailyRoutine());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @function generateDailyRoutine
   * @memberof DailyRoutine
   * @description Generates a daily routine based off the user settings. This
   * function is called on mount so that a new routine is always created. This
   * function calls the generateRoutine function, passing in the necessary
   * exercises and state.
   * Created 12/18/20
   * @returns {number[]} A daily routine of exercises ready to plug into the
   * Routine component.
   *
   * @copyright 2023 Alexander Burdiss
   * @author Alexander Burdiss
   * @since 1/4/23
   * @version 1.0.2
   */
  function generateDailyRoutine() {
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
  }

  return (
    <View>
      <Routine exercises={currentRoutine} />
    </View>
  );
}

/**
 * @function generateRoutine
 * @memberof DailyRoutine
 * @description Generates a routine of random exercises based on the users'
 * settings and instrument selected.
 * Created 12/18/20
 * @param {Object} state The preferences state of the app.
 * @param {Object} exercises The exercises for the selected instrument in
 * state.
 * @returns {number[]} An array of Numbers that can be passed into the Routine
 * component.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/4/23
 * @version 1.0.1
 */
function generateRoutine(state, exercises) {
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
}

/**
 * @function randomElement
 * @memberof DailyRoutine
 * @description Takes a string array and returns a random element from the
 * input array
 * Created 1/13/21
 * @param {*[]} array An array of elements to get a random element from
 * @returns {*} A random element from the parameter
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/4/23
 * @version 1.1.1
 */
function randomElement(array) {
  return array[random(array.length - 1)];
}
