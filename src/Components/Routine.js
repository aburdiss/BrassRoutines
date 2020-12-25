import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Alert, Pressable} from 'react-native';
import {
  getHornImagePath,
  getTrumpetImagePath,
  getTromboneImagePath,
  getEuphoniumBassClefImagePath,
  getEuphoniumTrebleClefImagePath,
  getTubaImagePath,
} from '../Model/Model';
import HeaderButton from '../Components/HeaderButton';
import {useNavigation} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {PreferencesContext} from '../Model/Preferences';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Model/Model';
import {
  useDynamicStyleSheet,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dynamic';

/**
 * @description Handles the funcitonality for making a routine from a list of
 * exercises
 * @author Alexander Burdiss
 * @since 12/21/20
 * @param {*} param0
 * @todo Take out the instrument param and use state, since it is being
 * imported for favorites and the heart.
 */
const Routine = ({exercises, instrument}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {state, dispatch} = useContext(PreferencesContext);
  const navigation = useNavigation();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  useEffect(
    function () {
      navigation.setOptions({
        title: `${currentExerciseIndex + 1} / ${exercises.length}`,
        headerRight: () => <HeaderButton handler={advance}>Next</HeaderButton>,
        headerLeft: () => <HeaderButton handler={reverse}>Back</HeaderButton>,
      });
    },
    [currentExerciseIndex, exercises],
  );

  let getInstrumentImagePath;
  switch (instrument) {
    case 'horn':
      getInstrumentImagePath = getHornImagePath;
      break;
    case 'trumpet':
      getInstrumentImagePath = getTrumpetImagePath;
      break;
    case 'trombone':
      getInstrumentImagePath = getTromboneImagePath;
      break;
    case 'euphonium':
      if (state.bassClef == 1) {
        getInstrumentImagePath = getEuphoniumBassClefImagePath;
      } else {
        getInstrumentImagePath = getEuphoniumTrebleClefImagePath;
      }
      break;
    case 'tuba':
      getInstrumentImagePath = getTubaImagePath;
      break;
  }

  function addToFavorites() {
    let currentExercise = exercises[currentExerciseIndex];
    if (state.favorites.includes(currentExercise)) {
      let tempFavorites = state.favorites.filter((item) => {
        return item != currentExercise;
      });
      dispatch({type: 'SET_SETTING', payload: {favorites: tempFavorites}});
      Alert.alert('Item removed from favorites');
    } else {
      let tempFavorites = [...state.favorites];
      tempFavorites.push(currentExercise);
      dispatch({type: 'SET_SETTING', payload: {favorites: tempFavorites}});
      Alert.alert('Item added to favorites');
    }
  }

  function advance() {
    if (currentExerciseIndex === exercises.length - 1) {
      Alert.alert('Daily Routine Complete', '', [
        {
          text: 'Return',
          onPress: () => navigation.pop(),
          style: 'cancel',
        },
      ]);
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  }

  function reverse() {
    if (currentExerciseIndex === 0) {
      navigation.pop();
    } else {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  }

  return (
    <SafeAreaView style={styles.container} forceInset="top">
      <View style={styles.heartContainer}>
        <Pressable onPress={addToFavorites}>
          <Ionicons
            name={
              state.favorites.includes(exercises[currentExerciseIndex])
                ? 'heart'
                : 'heart-outline'
            }
            size={28}
            color={
              state.favorites.includes(exercises[currentExerciseIndex])
                ? colors.pinkLight
                : colors.orangeLight
            }
            style={styles.heart}
          />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={getInstrumentImagePath(exercises[currentExerciseIndex])}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  heartContainer: {
    alignItems: 'flex-end',
    zIndex: 5,
    marginBottom: -34,
  },
  heart: {
    paddingRight: 10,
    paddingTop: 6,
    opacity: 0.8,
  },
});

export default Routine;
