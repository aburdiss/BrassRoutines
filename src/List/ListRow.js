import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {colors} from '../Model/Model';

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
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
};

export default ListRow;
