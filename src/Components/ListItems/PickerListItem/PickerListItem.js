import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @description A rendered Picker list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 12/25/20
 * @version 1.0.1
 * @param {Object} props.item The data to be rendered inside this list row.
 * @param {Object} props.state The current app state, including user
 * preferences.
 * @param {Function} props.dispatch A funciton to call to the reducer to update
 * app state.
 *
 * @component
 * @example
 * ```jsx
<PickerListItem
  item={item}
  state={state}
  dispatch={dispatch}
/>
```
 */
export default function PickerListItem({ item, state, dispatch }) {
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
    linkText: {
      color: DARKMODE ? colors.orangeDark : colors.orangeLight,
    },
  });

  const [currentInstrument, setCurrentInstrument] = useState(state.instrument);
  useEffect(() => {
    setCurrentInstrument(state.instrument);
  }, [state.instrument]);

  let values;
  switch (item.setting) {
    case 'instrument':
      values = [
        {
          label: translate('Horn'),
          value: 'horn',
          color: colors.orangeLight,
        },
        {
          label: translate('Trumpet'),
          value: 'trumpet',
          color: colors.orangeLight,
        },
        {
          label: translate('Trombone'),
          value: 'trombone',
          color: colors.orangeLight,
        },
        {
          label: translate('Euphonium'),
          value: 'euphonium',
          color: colors.orangeLight,
        },
        {
          label: translate('Tuba'),
          value: 'tuba',
          color: colors.orangeLight,
        },
      ];
      break;
    default:
      throw new Error('Item setting does not match any values');
  }

  return (
    <View style={styles.listSegmentedRowContainer}>
      <RNPickerSelect
        onValueChange={(value) => {
          setCurrentInstrument(value);
          dispatch({ type: 'SET_SETTING', payload: { instrument: value } });
        }}
        value={currentInstrument}
        items={values}
        placeholder={{}}
        style={{
          iconContainer: {
            top: 9,
          },
          inputIOS: {
            color: DARKMODE ? colors.white : colors.black,
            height: '100%',
          },
          inputAndroid: {
            color: DARKMODE ? colors.white : colors.black,
          },
          modalViewMiddle: {
            backgroundColor: DARKMODE
              ? colors.systemGray6Dark
              : colors.systemGray6Light,
          },
          modalViewBottom: {
            backgroundColor: DARKMODE ? colors.black : colors.white,
          },
        }}
        Icon={() => {
          return (
            <Ionicons
              name={'chevron-down-outline'}
              size={24}
              color={styles.linkText.color}
            />
          );
        }}
      />
    </View>
  );
}
