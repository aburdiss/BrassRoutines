import React from 'react';
import {Text, Switch} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';
import {Pressable} from 'react-native';

/**
 * @description One Switch Row that is used on the Scale and Arpeggio Display
 * views. This view was created to create a more accessible and reuseable
 * switch row.
 * @author Alexander Burdiss
 * @since 1/5/21
 */
const SwitchRow = ({value, onValueChange, text}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <Pressable
      style={styles.switchRow}
      accessible={true}
      accessibilityLabel={translate('Toggles Switch') + ' ' + text}
      onPress={onValueChange}>
      <Text style={styles.switchText}>{text}</Text>
      <Switch onValueChange={onValueChange} value={value} />
    </Pressable>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 40,
  },
  switchText: {
    color: new DynamicValue(colors.black, colors.white),
  },
});

export default SwitchRow;
