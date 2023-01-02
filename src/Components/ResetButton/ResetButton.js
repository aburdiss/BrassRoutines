import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { View, Pressable, Text } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function ResetButton
 * @component
 * @description A styled button that is used as a reset button on lists.
 * Created 12/27/20 by Alexander Burdiss
 * @param {Object} props JSX props passed to this React Component
 * @param {Function} props.handler The function to call when the button is
 * pressed.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.0.1
 *
 * @example
 * <ResetButton handler={function} />
 */
export default function ResetButton({ handler }) {
  const DARKMODE = useDarkMode();

  const styles = StyleSheet.create({
    outerWrapper: {
      borderRadius: 8,
      borderColor: DARKMODE ? colors.redDark : colors.redLight,
      borderWidth: 1,
      margin: 10,
      padding: 14,
      overflow: 'hidden',
    },
    text: {
      textAlign: 'center',
      color: DARKMODE ? colors.redDark : colors.redLight,
      fontSize: 16,
    },
  });

  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.redDark : colors.redLight,
        }}
        accessibilityRole="button"
        accessibilityHint={translate('Resets exercise list')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.8 : 1,
          ...styles.outerWrapper,
        })}
        onPress={() => {
          Alert.alert(
            translate('All list items will be removed'),
            translate('This cannot be undone!'),
            [
              {
                text: translate('Reset'),
                onPress: handler,
                style: 'destructive',
              },
              {
                text: translate('Cancel'),
                style: 'cancel',
              },
            ],
          );
        }}
      >
        <Text style={styles.text}>{translate('Reset')}</Text>
      </Pressable>
    </View>
  );
}
