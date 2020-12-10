import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {getTromboneImagePath} from '../Model/Model';
import HeaderButton from '../Components/HeaderButton';
import {useNavigation} from '@react-navigation/native';
import RoutineHeaderRightComponent from '../Components/RoutineHeaderRightComponent';

const Routine = ({exercises}) => {
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
    [currentExerciseIndex],
  );

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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={getTromboneImagePath(exercises[currentExerciseIndex])}
          style={styles.image}
        />
      </View>
    </View>
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
