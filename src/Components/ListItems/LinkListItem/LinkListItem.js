import React from 'react';
import { View, Pressable, Text, Linking, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @function LinkListItem
 * @component
 * @description A rendered Link list item with a chevron and theme colored text
 * Created 11/15/20
 * @param {Object} props JSX props passed to this React Component
 * @param {Object} props.item The list item containing a link and some text.
 * @param {Object} props.state The app state, containing all of the user's
 * preferences.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.0.3
 *
 * @example
 * <LinkListItem
 *   item={item}
 *   state={state}
 * />
 */
export default function LinkListItem({ item, state }) {
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
    linkText: {
      color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      paddingRight: 5,
    },
  });

  const isHidden = item.instrument && state.instrument != item.instrument;

  return isHidden ? null : (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      accessibilityRole="link"
      onPress={() => {
        Linking.openURL(item.link).catch((err) =>
          console.warn("Couldn't load page", err),
        );
      }}
    >
      <View style={styles.listRowContainer}>
        <Text maxFontSizeMultiplier={1.8} style={styles.linkText}>
          {translate(item.value)}
        </Text>
        <Ionicons
          name={'chevron-forward-outline'}
          size={25}
          color={styles.linkText.color}
        />
      </View>
    </Pressable>
  );
}
