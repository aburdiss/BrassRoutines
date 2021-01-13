import React from 'react';
import {View} from 'react-native';
import {Text, Pressable} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A simple button to live on the header and provide additional
 * navigation options in the app. This component handles translation of the
 * text that is passed in to it.
 * @author Alexander Burdiss
 * @since 1/3/21
 * @version 1.0.0
 *
 * @component
 * @example
 *   <HeaderButton handler={handler}>
 *     Hello, World!
 *   </HeaderButton />
 */
const HeaderButton = ({children, handler}) => {
  const DARKMODE = useDarkMode();
  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      }}
      onPress={handler}
      accessibilityRole="link"
      accessible={true}
      accessibilityLabel={translate(children)}
      accessibilityHint={translate('Navigates to') + ' ' + translate(children)}
      style={{
        padding: 8,
        marginRight: 4,
      }}>
      {({pressed}) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            opacity: pressed ? 0.7 : 1,
          }}>
          {children == 'Back' ? (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={DARKMODE ? colors.orangeDark : colors.orangeLight}
            />
          ) : null}
          <Text
            style={{
              color: DARKMODE ? colors.orangeDark : colors.orangeLight,
              fontSize: 16,
            }}>
            {translate(children)}
          </Text>
          {children == 'Next' ? (
            <Ionicons
              name="chevron-forward-outline"
              size={25}
              color={DARKMODE ? colors.orangeDark : colors.orangeLight}
            />
          ) : null}
        </View>
      )}
    </Pressable>
  );
};

export default HeaderButton;
