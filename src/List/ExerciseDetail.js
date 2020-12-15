import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {getTromboneImagePath} from '../Model/Model';

const ExerciseDetail = () => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container} forceInset="top">
      <View style={styles.imageContainer}>
        <Image
          source={getTromboneImagePath(route.params)}
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
