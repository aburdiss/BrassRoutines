import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @function TextListItem
 * @component
 * @description A rendered Text list item. This will not translate
 * copyright information.
 * Created 1/3/21
 * @param {Object} props JSX props passed to this React Component
 * @param {Object} props.item The text to be rendered in the list item.
 * @returns {JSX.Element} JSX Render Instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.1.1
 *
 * @example
 * <TextListItem item={item} />
 */
export default function TextListItem({ item }) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    listRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
    },
    listRowText: {
      color: DARKMODE ? colors.white : colors.black,
      paddingVertical: 5,
    },
  });

  return (
    <View style={styles.listRowContainer}>
      <Text
        maxFontSizeMultiplier={1.8}
        style={styles.listRowText}
        accessibilityRole="text"
      >
        {item.value.includes('Alexander Burdiss')
          ? item.value
          : translate(item.value)}
      </Text>
    </View>
  );
}
