import React from 'react';
import { Text, Pressable } from 'react-native';
import { useDarkMode } from 'react-native-dynamic'

import { colors } from '../Model/Model';

/**
 * @description A simple button to live on the header and provide additional 
 * navigation options in the app.
 * @author Alexander Burdiss
 * @since 12/2/20
 */
const HeaderButton = ({ children, handler }) => {
  const DARKMODE = useDarkMode();
  return (
    <Pressable
      android_ripple={{color: DARKMODE ? colors.orangeDark : colors.orangeLight }}
      onPress={ handler }
      style={{
        padding: 8,
        marginRight: 4,
      }}
      >
        {({ pressed }) => (
          <Text
          style={{
            color: DARKMODE ? colors.orangeDark : colors.orangeLight,
            opacity: pressed ? 0.7 : 1,
            fontSize: 16,
          }}
          >
            { children }
          </Text>
        )}
      </Pressable>
  );
};

export default HeaderButton;
