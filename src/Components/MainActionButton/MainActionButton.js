import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A purple button meant to trigger the randomize process of the
 * app. Basic styles are already applied.
 * @author Alexander Burdiss
 * @since 10/11/20
 * @version 1.0.1
 * @param {Function} props.handler The function to call when the button is
 * pressed.
 * @param {String} props.text The text rendered on the button.
 *
 * @component
 * @example
 *   <MainActionButton handler={function}>
 *     Hello, World!
 *   </MainActionButton>
 */
export default function MainActionButton({ handler, text }) {
  const DARKMODE = useDarkMode();

  const styles = StyleSheet.create({
    outerWrapper: {
      borderRadius: 8,
      borderColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
      borderWidth: 1,
      margin: 10,
      padding: 10,
      overflow: 'hidden',
    },
    text: {
      textAlign: 'center',
      color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      fontSize: 24,
    },
  });
  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      }}
      accessibilityRole="button"
      onPress={handler}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        ...styles.outerWrapper,
      })}
    >
      <Text style={styles.text}>{translate(text)}</Text>
    </Pressable>
  );
}
