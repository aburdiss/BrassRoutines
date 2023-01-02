import React from 'react';
import { View, StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @description A rendered Segmented Control list item that updates saved
 * preferences.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.1
 * @param {Object} props.item The data to render in this list item
 * @param {Object} props.state The current user app state
 * @param {Function} props.dispatch A function to call to the reducer to
 * update the user state of the app.
 *
 * @component
 * @example
 * ```jsx
<SegmentedControlListItem
  item={item}
  state={state}
  dispatch={dispatch}
/>
```
 */
export default function SegmentedControlListItem({ item, state, dispatch }) {
  let choices;
  switch (item.setting) {
    case 'routineLength':
      choices = [translate('Short'), translate('Medium'), translate('Long')];
      break;
    case 'bassClef':
      if (state.instrument == 'euphonium') {
        choices = [translate('Treble Clef'), translate('Bass Clef')];
      } else if (state.instrument == 'trombone') {
        choices = [translate('Tenor/Bass Clef'), translate('Bass Clef Only')];
      }
      break;
    default:
      throw new Error('Item Setting does not match any choices.');
  }

  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    listSegmentedRowContainer: {
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
      justifyContent: 'center',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      height: 45,
    },
  });
  // Hide Filter if the setting is "bassClef" and instrument is not Euphonium
  let isHidden =
    state.instrument != 'euphonium' &&
    state.instrument != 'trombone' &&
    item.setting == 'bassClef';
  return isHidden ? null : (
    <View style={styles.listSegmentedRowContainer}>
      <SegmentedControl
        values={choices}
        selectedIndex={state[item.setting]}
        onChange={(event) => {
          let index = event.nativeEvent.selectedSegmentIndex;
          let setting = { [item.setting]: index };
          dispatch({ type: 'SET_SETTING', payload: setting });
        }}
      />
    </View>
  );
}
