import React from 'react';
import { Pressable, Text, Switch, StyleSheet } from 'react-native';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @function SwitchListItem
 * @component
 * @description A rendered Switch list item that updates saved preferences.
 * Created 1/5/21
 * @param {Object} props JSX props passed to this React component
 * @param {Object} props.item The data to be rendered in this component.
 * @param {Object} props.state The current state of the app, including user
 * preferences.
 * @param {Function} props.dispatch A function to make a reducer call to update
 * state.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.0.3
 *
 * @example
 * <SwitchListItem
 *   item={item}
 *   state={state}
 *   dispatch={dispatch}
 * />
 */
export default function SwitchListItem({ item, state, dispatch }) {
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

  function updateValue() {
    let updatedState = !state[item.setting];
    let newSetting = { [item.setting]: updatedState };
    dispatch({ type: 'SET_SETTING', payload: newSetting });
  }

  return (
    <Pressable
      style={styles.listRowContainer}
      onPress={updateValue}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      accessibilityState={{ checked: state[item.setting] }}
      accessibilityRole="switch"
      accessibilityHint={
        translate('Toggles setting') + ' ' + translate(item.value)
      }
    >
      <Text maxFontSizeMultiplier={1.8} style={styles.listRowText}>
        {translate(item.value)}
      </Text>
      <Switch value={state[item.setting]} onValueChange={updateValue} />
    </Pressable>
  );
}
