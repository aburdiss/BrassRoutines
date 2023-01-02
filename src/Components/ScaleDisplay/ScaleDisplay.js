import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';

/**
 * @function ScaleDisplay
 * @component
 * @description A styled text box that shows the currently selected scale
 * Created 10/11/20
 * @param {Object} props JSX props passed to this React component
 * @param {string|JSX.Element} props.children The text to display in this
 * component.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.0.2
 *
 * @example
 * <ScaleDisplay>
 *   Hello, World!
 * </ScaleDisplay>
 */
export default function ScaleDisplay({ children }) {
  const DARKMODE = useDarkMode();

  const styles = StyleSheet.create({
    outerWrapper: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 10,
    },
    text: {
      backgroundColor: DARKMODE
        ? colors.systemGray2Dark
        : colors.systemGray2Light,
      color: DARKMODE ? colors.white : colors.black,
      overflow: 'hidden',
      textAlign: 'center',
      width: '100%',
      padding: 16,
      fontSize: 18,
      borderRadius: 8,
    },
  });

  return (
    <View style={styles.outerWrapper}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
