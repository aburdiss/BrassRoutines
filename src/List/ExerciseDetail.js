import React, {useContext, useState} from 'react';
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

/**
 * @description Shows an individual exercise, and allows the user to select the
 * exercise as a favorite.
 * @todo Add the 'Add to favorite' button.
 * @todo Add Zoom in on image functionality.
 * @todo Add Change instrument functionality.
 */
const ExerciseDetail = () => {
  const styles = useDynamicValue(dynamicStyles);
  const [zoomModalIsShowing, setZoomModalIsShowing] = useState(false);
  const {state, dispatch} = useContext(PreferencesContext);
  const route = useRoute();
  let getInstrumentImagePath;

  function addToFavorites() {
    let currentExercise = route.params.item;
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

  switch (route.params.instrument) {
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
  return (
    <SafeAreaView style={styles.container} forceInset="top">
      <View style={styles.heartContainer}>
        <Pressable onPress={addToFavorites}>
          <Ionicons
            name={
              state.favorites.includes(route.params.item)
                ? 'heart'
                : 'heart-outline'
            }
            size={28}
            color={
              state.favorites.includes(route.params.item)
                ? colors.pinkLight
                : colors.orangeLight
            }
            style={styles.heart}
          />
        </Pressable>
      </View>
      <Pressable
        style={styles.imageContainer}
        onPress={() => {
          setZoomModalIsShowing(true);
        }}>
        <Image
          source={getInstrumentImagePath(route.params.item)}
          style={styles.image}
        />
      </Pressable>
      <ZoomModal
        imagePath={getInstrumentImagePath(route.params.item)}
        zoomModalIsShowing={zoomModalIsShowing}
        setZoomModalIsShowing={setZoomModalIsShowing}
      />
    </SafeAreaView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
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

export default ExerciseDetail;
