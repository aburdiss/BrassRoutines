import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import { useDarkMode } from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, getExerciseDisplayName } from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A component that renders the default list row on the listView.
 * @author Alexander Burdiss
 * @since 12/14/2020
 * @version 1.1.2
 * @param {Function} props.onPress The function to call when this exercise is
 * pressed
 * @param {String} props.text The text to render in this row.
 *
 * @component
 * @example
 *   <ListRow onPress={onPress} text="Hello, World!" />
 */
const ListRow = ({ onPress, text }) => {
  const { state } = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();

  return (
    <Pressable
      accessible={true}
      accessibilityRole="link"
      accessibilityHint={translate('Opens Exercise')}
      accessibilityLabel={
        getExerciseDisplayName(text, state) +
        (state.favorites.includes(text)
          ? translate('This is a favorite exercise')
          : '')
      }
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          paddingVertical: 8,
          height: 45,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
        }}
      >
        <Text
          maxFontSizeMultiplier={1.8}
          style={{ color: DARKMODE ? colors.white : colors.black }}
        >
          {getExerciseDisplayName(text, state)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {state.favorites.includes(text) ? (
            <Ionicons
              name="heart"
              size={24}
              color={DARKMODE ? colors.pinkDark : colors.pinkLight}
            />
          ) : null}
          <Ionicons
            name="chevron-forward-outline"
            size={25}
            color={colors.systemGray}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ListRow;
