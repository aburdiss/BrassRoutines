import React from 'react';
import { View, Pressable, Text, Alert, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @description A rendered Button list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.2
 * @param {Object} props.item The data to be rendered in this list item
 * @param {Function} props.dispatch A function to call a reducer and update
 * app state.
 *
 * @component
 * @example
 * ```jsx
<ButtonListItem
  item={item}
  dispatch={dispatch}
/>
```
 */
export default function ButtonListItem({ item, dispatch }) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    listButtonRowContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      height: 45,
    },
    linkText: {
      color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      paddingRight: 5,
    },
  });

  return (
    <Pressable
      onPress={() => {
        if (item.value === 'Reset Favorites') {
          Alert.alert(
            translate('All favorites will be removed'),
            translate('This cannot be undone!'),
            [
              {
                text: translate('Return'),
                style: 'cancel',
              },
              {
                text: translate('Reset'),
                style: 'destructive',
                onPress: () => {
                  dispatch({ type: 'RESET_FAVORITES' });
                },
              },
            ],
          );
        } else if (item.value === 'Reset Custom Routines') {
          Alert.alert(
            translate('All custom routines will be removed'),
            translate('This cannot be undone!'),
            [
              {
                text: translate('Return'),
                style: 'cancel',
              },
              {
                text: translate('Reset'),
                style: 'destructive',
                onPress: () => {
                  dispatch({ type: 'RESET_CUSTOM_ROUTINES' });
                },
              },
            ],
          );
        } else if (item.value === 'Restore Defaults') {
          Alert.alert(
            translate('All settings will be restored to defaults'),
            translate('This cannot be undone!'),
            [
              {
                text: translate('Return'),
                style: 'cancel',
              },
              {
                text: translate('Reset'),
                style: 'destructive',
                onPress: () => {
                  dispatch({ type: 'RESET_PREFERENCES' });
                },
              },
            ],
          );
        }
      }}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View style={styles.listButtonRowContainer}>
        <Text maxFontSizeMultiplier={1.8} style={styles.linkText}>
          {translate(item.value)}
        </Text>
        <Ionicons name={item.icon} size={22} color={styles.linkText.color} />
      </View>
    </Pressable>
  );
}
