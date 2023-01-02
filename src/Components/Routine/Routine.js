import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Alert, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  colors,
  getHornImagePath,
  getTrumpetImagePath,
  getTromboneImagePath,
  getTromboneBassClefOnlyImagePath,
  getEuphoniumBassClefImagePath,
  getEuphoniumTrebleClefImagePath,
  getTubaImagePath,
} from '../../Model/Model';
import ZoomModal from '../ZoomModal/ZoomModal';
import HeaderButton from '../HeaderButton/HeaderButton';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode } from '../../utils';

/**
 * @description Handles the funcitonality for making a routine from a list of
 * exercises
 * @author Alexander Burdiss
 * @since 12/21/20
 * @version 1.1.1
 * @param {Array} props.exercises The list of exercises to play in the Routine.
 *
 * @component
 * @example
 *   <Routine exercises={[1, 2, 3, 4, 5]} />
 */
export default function Routine({ exercises }) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
    imageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageModal: {
      backgroundColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
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

  const { state, dispatch } = useContext(PreferencesContext);
  const navigation = useNavigation();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [zoomModalIsShowing, setZoomModalIsShowing] = useState(false);
  useEffect(
    /**
     * @function Routine~useEffect~updateHeaderItems
     * @description Updates the header items whenever the exercise in the
     * routine is updated.
     * @author Alexander Burdiss
     * @since 12/9/20
     * @version 1.0
     */
    function updateHeaderItems() {
      navigation.setOptions({
        title: `${currentExerciseIndex + 1} / ${exercises.length}`,
        headerRight: () => <HeaderButton handler={advance}>Next</HeaderButton>,
        headerLeft: () => <HeaderButton handler={reverse}>Back</HeaderButton>,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentExerciseIndex, exercises],
  );

  let getInstrumentImagePath;
  switch (state.instrument) {
    case 'horn':
      getInstrumentImagePath = getHornImagePath;
      break;
    case 'trumpet':
      getInstrumentImagePath = getTrumpetImagePath;
      break;
    case 'trombone':
      if (state.bassClef == 1) {
        getInstrumentImagePath = getTromboneBassClefOnlyImagePath;
      } else {
        getInstrumentImagePath = getTromboneImagePath;
      }
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

  /**
   * @function Routine~addToFavorites
   * @description Adds the currently selected exercise to the favorites state,
   * and alerts the user of the addition.
   * @author Alexander Burdiss
   * @since 12/22/20
   * @version 1.0
   */
  function addToFavorites() {
    let currentExercise = exercises[currentExerciseIndex];
    if (state.favorites.includes(currentExercise)) {
      let tempFavorites = state.favorites.filter((item) => {
        return item != currentExercise;
      });
      dispatch({ type: 'SET_SETTING', payload: { favorites: tempFavorites } });
    } else {
      let tempFavorites = [...state.favorites];
      tempFavorites.push(currentExercise);
      dispatch({ type: 'SET_SETTING', payload: { favorites: tempFavorites } });
    }
  }

  /**
   * @function Routine~advance
   * @description Advances the current exercise to the next in the list. If
   * there are no more exercises, ends the routine.
   * @author Alexander Burdiss
   * @since 12/9/20
   * @version 1.0.0
   */
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

  /**
   * @function Routine~reverse
   * @description Goes back one exercise in the routine. If there are no
   * previous exercises, closes the routine view.
   * @author Alexander Burdiss
   * @since 12/9/20
   * @version 1.0.0
   */
  function reverse() {
    if (currentExerciseIndex === 0) {
      navigation.pop();
    } else {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
      forceInset="top"
      edges={['left', 'right']}
    >
      <View style={styles.heartContainer} accessibilityRole="toolbar">
        <Pressable
          onPress={addToFavorites}
          accessibilityLabel={
            state.favorites.includes(exercises[currentExerciseIndex])
              ? translate('This is a favorite exercise')
              : translate('This is not a favorite exercise')
          }
          accessible={true}
          accessibilityHint={translate('Add exercise to favorites')}
        >
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
      <Pressable
        style={styles.imageContainer}
        accessibilityRole="imagebutton"
        accessibilityLabel={translate('Opens exercise modal')}
        onPress={() => {
          setZoomModalIsShowing(true);
        }}
      >
        <Image
          accessibilityLiveRegion="polite"
          source={getInstrumentImagePath(exercises[currentExerciseIndex])}
          style={styles.image}
        />
      </Pressable>
      <ZoomModal
        imagePath={getInstrumentImagePath(exercises[currentExerciseIndex])}
        zoomModalIsShowing={zoomModalIsShowing}
        setZoomModalIsShowing={setZoomModalIsShowing}
      />
    </SafeAreaView>
  );
}
