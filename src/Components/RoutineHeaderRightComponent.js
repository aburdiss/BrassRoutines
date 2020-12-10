import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import HeaderButton from './HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Model/Model';

const RoutineHeaderRightComponent = ({advance, addToFavorites, isFavorite}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={addToFavorites}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? colors.pinkLight : colors.orangeLight}
        />
      </Pressable>
      <HeaderButton handler={advance}>Next</HeaderButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});

export default RoutineHeaderRightComponent;
