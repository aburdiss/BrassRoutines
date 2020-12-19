import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  getHornImagePath,
  getTrumpetImagePath,
  getTromboneImagePath,
  getEuphoniumImagePath,
  getTubaImagePath,
} from '../Model/Model';

const ExerciseDetail = () => {
  const route = useRoute();
  console.log(route.params);
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

export default ExerciseDetail;
