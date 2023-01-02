import React from 'react';
import { Pressable, Text } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';

/**
 * @function AllScalesButton
 * @component
 * @description A gray button that is meant to trigger all switches on a page.
 * Basic styles are already applied.
 * Created 10/12/20
 * @param {Object} props JSX props passed to this React component
 * @param {string} props.children The text to render in this styled button.
 * @param {Function} props.handler The function to call when this component is
 * tapped.
 * @returns {JSX.Element} JSX Render Instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.1.2
 *
 * @example
 *   <AllScalesButton handler={handler}>
 *     Hello, World!
 *   </AllScalesButton>
 */
export default function AllScalesButton({ children, handler }) {
  const DARKMODE = useDarkMode();

  const styles = {
    pressable: {
      borderRadius: 8,
      borderColor: DARKMODE ? colors.systemGray : colors.systemGray,
      borderWidth: 1,
      marginVertical: 10,
      padding: 10,
      overflow: 'hidden',
    },
    text: {
      textAlign: 'center',
      color: DARKMODE ? colors.systemGray : colors.systemGray,
      fontSize: 16,
    },
  };

  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.systemGray : colors.systemGray,
      }}
      onPress={handler}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        ...styles.pressable,
      })}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
