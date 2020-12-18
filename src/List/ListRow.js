import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {colors} from '../Model/Model';

/**
 * @description A component that renders the default list row on the listView.
 * @author Alexander Burdiss
 * @since 12/14/2020
 */
const ListRow = ({onPress, text}) => {
  const DARKMODE = useDarkMode();
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          paddingVertical: 8,
          height: 45,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
        }}>
        <Text style={{color: DARKMODE ? colors.white : colors.black}}>
          {getExerciseDisplayName(text)}
        </Text>
      </View>
    </Pressable>
  );
};

/**
 * @description A preprocess function to render The Major Scale Labels
 * correctly for the different instruments and for the different languages.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @param {*} text Exercise Number to be preprocessed.
 */
const getExerciseDisplayName = (text) => {
  return text;
};

export default ListRow;
