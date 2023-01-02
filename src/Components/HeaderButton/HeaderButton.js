import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useDarkMode } from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A simple button to live on the header and provide additional
 * navigation options in the app. This component handles translation of the
 * text that is passed in to it.
 * @author Alexander Burdiss
 * @since 1/3/21
 * @version 1.0.2
 * @param {Function} props.handler The function to call when the button is
 * pressed.
 * @param {String} props.children The Text to render in the header button.
 *
 * @component
 * @example
 *   <HeaderButton handler={handler}>
 *     Hello, World!
 *   </HeaderButton />
 */
export default function HeaderButton({ children, handler }) {
  const DARKMODE = useDarkMode();

  const styles = StyleSheet.create({
    icon: {
      marginBottom: -10,
      marginTop: -8,
    },
    innerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    outerWrapper: {
      padding: 8,
      marginRight: 4,
    },
    text: {
      color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      fontSize: 16,
    },
  });

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
      style={styles.outerWrapper}
    >
      {({ pressed }) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ opacity: pressed ? 0.7 : 1, ...styles.innerWrapper }}>
          {children == 'Back' ? (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={DARKMODE ? colors.orangeDark : colors.orangeLight}
              style={styles.icon}
            />
          ) : null}
          <Text maxFontSizeMultiplier={1.8} style={styles.text}>
            {translate(children)}
          </Text>
          {children == 'Next' ? (
            <Ionicons
              name="chevron-forward-outline"
              size={25}
              color={DARKMODE ? colors.orangeDark : colors.orangeLight}
              style={styles.icon}
            />
          ) : null}
        </View>
      )}
    </Pressable>
  );
}
