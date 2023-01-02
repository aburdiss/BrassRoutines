import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { View, Pressable, Text } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A styled button that is used as a reset button on lists.
 * @author Alexander Burdiss
 * @since 12/27/20
 * @version 1.0.1
 * @param {Function} props.handler The function to call when the button is
 * pressed.
 *
 * @component
 * @example
 *   <ResetButton handler={function} />
 */
const ResetButton = ({ handler }) => {
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
};

export default ResetButton;
