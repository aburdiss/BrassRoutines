import React, {useContext, useEffect, useState} from 'react';
import {View, Image, Alert, Pressable} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  DynamicValue,
  DynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dynamic';
import {PreferencesContext} from '../Model/Preferences';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  colors,
  getHornImagePath,
  getTrumpetImagePath,
  getTromboneImagePath,
  getEuphoniumBassClefImagePath,
  getEuphoniumTrebleClefImagePath,
  getTubaImagePath,
} from '../Model/Model';
import ZoomModal from '../Components/ZoomModal';
import {translate} from '../Translations/TranslationModel';
import ChangeInstrumentModal from '../Components/ChangeInstrumentModal';

/**
 * @description Shows an individual exercise, and allows the user to select the
 * exercise as a favorite.
 * @author Alexander Burdiss
 * @since 12/25/20
 * @version 1.1.0
 *
 * @component
 * @example
 *   <ExerciseDetail />
 */
const ExerciseDetail = () => {
  const styles = useDynamicValue(dynamicStyles);
  const [zoomModalIsShowing, setZoomModalIsShowing] = useState(false);
  const [imagePath, setImagePath] = useState(undefined);
  const [
    changeInstrumentModalIsShowing,
    setChangeInstrumentModalIsShowing,
  ] = useState(false);
  const {state, dispatch} = useContext(PreferencesContext);
  const route = useRoute();

  useEffect(
    function getInstrumentImagePath() {
      switch (state.instrument) {
        case 'horn':
          setImagePath(getHornImagePath(route.params.item));
          break;
        case 'trumpet':
          setImagePath(getTrumpetImagePath(route.params.item));
          break;
        case 'trombone':
          setImagePath(getTromboneImagePath(route.params.item));
          break;
        case 'euphonium':
          if (state.bassClef == 1) {
            setImagePath(getEuphoniumBassClefImagePath(route.params.item));
          } else {
            setImagePath(getEuphoniumTrebleClefImagePath(route.params.item));
          }
          break;
        case 'tuba':
          setImagePath(getTubaImagePath(route.params.item));
          break;
      }
    },
    [changeInstrumentModalIsShowing, state.instrument, state.bassClef],
  );

  /**
   * @function ExerciseDetail~addToFavorites
   * @description Adds the current exercise to favorites, or removes it if it
   * already exists.
   * @author Alexander Burdiss
   * @since 12/25/20
   * @version 1.0.0
   */
  function addToFavorites() {
    let currentExercise = route.params.item;
    if (state.favorites.includes(currentExercise)) {
      let tempFavorites = state.favorites.filter((item) => {
        return item != currentExercise;
      });
      dispatch({type: 'SET_SETTING', payload: {favorites: tempFavorites}});
      Alert.alert(translate('Item removed from favorites'));
    } else {
      let tempFavorites = [...state.favorites];
      tempFavorites.push(currentExercise);
      dispatch({type: 'SET_SETTING', payload: {favorites: tempFavorites}});
      Alert.alert(translate('Item added to favorites'));
    }
  }

  /**
   * @function ExerciseDetail~toggleChangeInstrumentModal
   * @description Opens the change instrument modal, to view the current
   * exercise in a different instrument.
   * @author Alexander Burdiss
   * @since 1/25/21
   * @version 1.0.0
   */
  function toggleChangeInstrumentModal() {
    setChangeInstrumentModalIsShowing(true);
  }

  return (
    <SafeAreaView style={styles.container} forceInset="top">
      <View style={styles.heartContainer} accessibilityRole="toolbar">
        <Pressable
          onPress={toggleChangeInstrumentModal}
          accessibilityLabel={'Opens change instrument modal'}
          accessible={true}>
          <Ionicons
            name="menu-outline"
            size={28}
            color={styles.iconColor.color}
          />
        </Pressable>
        <Pressable
          onPress={addToFavorites}
          accessibilityLabel={
            state.favorites.includes(route.params.item)
              ? translate('This is a favorite exercise')
              : translate('This is not a favorite exercise')
          }
          accessible={true}
          accessibilityHint={translate('Add exercise to favorites')}>
          <Ionicons
            name={
              state.favorites.includes(route.params.item)
                ? 'heart'
                : 'heart-outline'
            }
            size={28}
            color={
              state.favorites.includes(route.params.item)
                ? styles.heartSelectedColor.color
                : styles.iconColor.color
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
        }}>
        <Image source={imagePath} style={styles.image} />
      </Pressable>
      <ZoomModal
        imagePath={imagePath}
        zoomModalIsShowing={zoomModalIsShowing}
        setZoomModalIsShowing={setZoomModalIsShowing}
      />
      <ChangeInstrumentModal
        changeInstrumentModalIsShowing={changeInstrumentModalIsShowing}
        setChangeInstrumentModalIsShowing={setChangeInstrumentModalIsShowing}
      />
    </SafeAreaView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  changeInstrumentModal: {
    backgroundColor: new DynamicValue(colors.white, colors.systemGray5Dark),
    width: '100%',
    marginHorizontal: 0,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 5,
    marginBottom: -34,
  },
  heart: {
    paddingRight: 10,
    paddingTop: 6,
    opacity: 0.8,
  },
  heartSelectedColor: {
    color: new DynamicValue(colors.pinkLight, colors.pinkDark),
  },
  iconColor: {
    color: new DynamicValue(colors.orangeLight, colors.orangeDark),
  },
});

export default ExerciseDetail;
