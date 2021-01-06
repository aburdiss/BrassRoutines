import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {colors} from '../Model/Model';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeButton = ({onPress, children}) => {
  const DARKMODE = useDarkMode();

  return (
    <View>
      <Pressable
        accessible={true}
        accessibilityLabel={children}
        accessibilityRole="link"
        onPress={onPress}
        style={({pressed}) => ({
          padding: 20,
          marginTop: 15,
          marginHorizontal: 10,
          backgroundColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
          opacity: pressed ? 0.7 : 1,
          borderRadius: 8,
          borderBottomColor: DARKMODE ? colors.yellowDark : colors.yellowLight,
          borderBottomWidth: 1,
          shadowColor: DARKMODE ? colors.white : colors.black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        })}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.black,
              textAlign: 'right',
              paddingLeft: 20,
            }}>
            {children}
          </Text>
          <Ionicons
            name="play"
            size={20}
            color={colors.black}
            style={{
              paddingLeft: 8,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default HomeButton;
