import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  DynamicValue,
  DynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dynamic';
import {
  colors,
  getHornImagePath,
  getTrumpetImagePath,
  getTromboneImagePath,
  getEuphoniumImagePath,
  getTubaImagePath,
} from '../Model/Model';

/**
 * @description Shows an individual exercise, and allows the user to select the
 * exercise as a favorite.
 * @todo Add the 'Add to favorite' button.
 * @todo Add Zoom in on image functionality.
 * @todo Add Change instrument functionality.
 */
const ExerciseDetail = () => {
  const styles = useDynamicValue(dynamicStyles);
  const route = useRoute();
  let getInstrumentImagePath;
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
      getInstrumentImagePath = getEuphoniumImagePath;
      break;
    case 'tuba':
      getInstrumentImagePath = getTubaImagePath;
      break;
  }
  return (
    <SafeAreaView style={styles.container} forceInset="top">
      <View style={styles.imageContainer}>
        <Image
          source={getInstrumentImagePath(route.params.item)}
          style={styles.image}
        />
      </View>
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
});

export default ExerciseDetail;
