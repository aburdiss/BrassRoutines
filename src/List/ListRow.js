import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

const ListRow = ({onPress, text}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}>
      <View style={styles.rowContainer}>
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    height: 45,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    // borderBottomColor: new DynamicValue(
    //   colors.systemGray5Light,
    //   colors.systemGray5Dark,
    // ),
  },
});

export default ListRow;
