import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';

/**
 * @description A styled text box that shows the currently selected scale
 * @author Alexander Burdiss
 * @since 10/11/20
 * @version 1.0.1
 * @param {Text} props.children The text to display in this component.
 *
 * @component
 * @example
 *   <ScaleDisplay>
 *     Hello, World!
 *   </ScaleDisplay>
 */
const ScaleDisplay = ({ children }) => {
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
};

export default ScaleDisplay;
