import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A styled button that is used as a reset button on lists.
 * @author Alexander Burdiss
 * @since 12/27/20
 * @version 1.0.0
 *
 * @component
 * @example
 *   <ResetButton handler={function} />
 */
const ResetButton = ({handler}) => {
  const DARKMODE = useDarkMode();

  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.redDark : colors.redLight,
        }}
        accessibilityRole="button"
        accessibilityHint={translate('Resets exercise list')}
        style={({pressed}) => ({
          borderRadius: 8,
          borderColor: DARKMODE ? colors.redDark : colors.redLight,
          opacity: pressed ? 0.8 : 1,
          borderWidth: 1,
          margin: 10,
          padding: 14,
          overflow: 'hidden',
        })}
        onPress={handler}>
        <Text
          style={{
            textAlign: 'center',
            color: DARKMODE ? colors.redDark : colors.redLight,
            fontSize: 16,
          }}>
          {translate('Reset')}
        </Text>
      </Pressable>
    </View>
  );
};

export default ResetButton;
