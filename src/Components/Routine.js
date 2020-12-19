import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {
  getHornImagePath,
  getTrumpetImagePath,
  getTromboneImagePath,
  getEuphoniumImagePath,
  getTubaImagePath,
} from '../Model/Model';
import HeaderButton from '../Components/HeaderButton';
import {useNavigation} from '@react-navigation/native';
import RoutineHeaderRightComponent from '../Components/RoutineHeaderRightComponent';
import SafeAreaView from 'react-native-safe-area-view';

const Routine = ({exercises, instrument}) => {
  const navigation = useNavigation();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  useEffect(
    function () {
      navigation.setOptions({
        title: `${currentExerciseIndex + 1} / ${exercises.length}`,
        headerRight: () => (
          <RoutineHeaderRightComponent
            advance={advance}
            addToFavorites={addToFavorites}
            isFavorite={getIsElementInFavorites()}
          />
        ),
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
      getInstrumentImagePath = getEuphoniumImagePath;
      break;
    case 'tuba':
      getInstrumentImagePath = getTubaImagePath;
      break;
  }

  function getIsElementInFavorites() {
    return false;
  }

  function addToFavorites() {}

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
      <View style={styles.imageContainer}>
        <Image
          source={getInstrumentImagePath(exercises[currentExerciseIndex])}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
});

export default Routine;
