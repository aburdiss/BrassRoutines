import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A styled button that is used to add a selected exercise to a
 * list
 * @author Alexander Burdiss
 * @since 12/27/20
 * @version 1.0.1
 * @param {function} props.handler The function to call when the button is
 * pressed.
 *
 * @component
 * @example
 *   <AddToListButton handler={function} />
 */
export default function AddToListButton({ handler }) {
  const DARKMODE = useDarkMode();

  const styles = {
    pressable: {
      borderRadius: 8,
      borderColor: DARKMODE ? colors.greenDark : colors.greenLight,
      borderWidth: 1,
      margin: 10,
      padding: 14,
      overflow: 'hidden',
    },
    text: {
      textAlign: 'center',
      color: DARKMODE ? colors.greenDark : colors.greenLight,
      fontSize: 16,
    },
  };

  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.greenDark : colors.greenLight,
        }}
        accessibilityRole="button"
        accessibilityHint={translate('Adds the selected exercise to the list')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.8 : 1,
          ...styles.pressable,
        })}
        onPress={handler}
      >
        <Text style={styles.text}>{translate('Add To List')}</Text>
      </Pressable>
    </View>
  );
}
