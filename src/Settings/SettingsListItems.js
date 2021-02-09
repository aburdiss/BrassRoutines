import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, Linking, Switch, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDarkMode,
  useDynamicValue,
} from 'react-native-dynamic';
import SegmentedControl from '@react-native-community/segmented-control';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A rendered Text list item. This will not translate 
 * copyright information.
 * @author Alexander Burdiss
 * @since 1/3/21
 * @version 1.1.0
 * @param {Object} props.item The text to be rendered in the list item.
 * 
 * @component
 * @example
 * ```jsx
<TextListItem item={item} />
```
 */
export const TextListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.listRowContainer}>
      <Text
        maxFontSizeMultiplier={1.8}
        style={styles.listRowText}
        accessibilityRole="text">
        {item.value.startsWith('©') ? item.value : translate(item.value)}
      </Text>
    </View>
  );
};

/**
 * @description A rendered Link list item with a chevron and theme colored text
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.0.2
 * @param {Object} props.item The list item containing a link and some text.
 * @param {Object} props.state The app state, containing all of the user's
 * preferences.
 * 
 * @component
 * @example
 * jsx```
<LinkListItem
  item={item}
  state={state}
/>
```
 */
export const LinkListItem = ({item, state}) => {
  const styles = useDynamicValue(dynamicStyles);
  const isHidden = item.instrument && state.instrument != item.instrument;

  return isHidden ? null : (
    <Pressable
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      accessibilityRole="link"
      onPress={() => {
        Linking.openURL(item.link).catch((err) =>
          console.error("Couldn't load page", err),
        );
      }}>
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
};

/**
 * @description A rendered link list item that opens a page inside the app on
 * the current stack. This is rendered the same as a LinkListItem, and performs
 * a similar function.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.2
 * @param {Object} props.item The Internal list item to be rendered containing
 * a Component name to render to, and the text to be rendered.
 * 
 * @component
 * @example
 * ```jsx
<InternalListItem item={item} />
```
 */
export const InternalListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();

  return (
    <Pressable
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      accessibilityRole="link"
      onPress={() => {
        navigation.navigate(item.component);
      }}>
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
};

/**
 * @description A rendered Switch list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 1/5/21
 * @version 1.0.2
 * @param {Object} props.item The data to be rendered in this component.
 * @param {Object} props.state The current state of the app, including user
 * preferences.
 * @param {Function} props.dispatch A function to make a reducer call to update
 * state.
 * 
 * @component
 * @example
 * ```jsx
<SwitchListItem
  item={item}
  state={state}
  dispatch={dispatch}
/>
```
 */
export const SwitchListItem = ({item, state, dispatch}) => {
  const styles = useDynamicValue(dynamicStyles);
  function updateValue() {
    let updatedState = !state[item.setting];
    let newSetting = {[item.setting]: updatedState};
    dispatch({type: 'SET_SETTING', payload: newSetting});
  }
  return (
    <Pressable
      style={styles.listRowContainer}
      onPress={updateValue}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      accessibilityState={{checked: state[item.setting]}}
      accessibilityRole="switch"
      accessibilityHint={
        translate('Toggles setting') + ' ' + translate(item.value)
      }>
      <Text maxFontSizeMultiplier={1.8} style={styles.listRowText}>
        {translate(item.value)}
      </Text>
      <Switch value={state[item.setting]} onValueChange={updateValue} />
    </Pressable>
  );
};

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
export const ButtonListItem = ({item, dispatch}) => {
  const styles = useDynamicValue(dynamicStyles);

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
                  dispatch({type: 'RESET_FAVORITES'});
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
                  dispatch({type: 'RESET_CUSTOM_ROUTINES'});
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
                  dispatch({type: 'RESET_PREFERENCES'});
                },
              },
            ],
          );
        }
      }}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}>
      <View style={styles.listButtonRowContainer}>
        <Text maxFontSizeMultiplier={1.8} style={styles.linkText}>
          {translate(item.value)}
        </Text>
        <Ionicons name={item.icon} size={22} color={styles.linkText.color} />
      </View>
    </Pressable>
  );
};

/**
 * @description A rendered Segmented filter list item that updates saved
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
<SegmentedFilterListItem
  item={item}
  state={state}
  dispatch={dispatch}
/>
```
 */
export const SegmentedFilterListItem = ({item, state, dispatch}) => {
  let choices;
  switch (item.setting) {
    case 'routineLength':
      choices = [translate('Short'), translate('Medium'), translate('Long')];
      break;
    case 'bassClef':
      choices = [translate('Treble Clef'), translate('Bass Clef')];
      break;
    default:
      throw new Error('Item Setting does not match any choices.');
  }

  const styles = useDynamicValue(dynamicStyles);
  // Hide Filter if the setting is "bassClef" and instrument is not Euphonium
  let isHidden = state.instrument != 'euphonium' && item.setting == 'bassClef';
  return isHidden ? null : (
    <View style={styles.listSegmentedRowContainer}>
      <SegmentedControl
        values={choices}
        selectedIndex={state[item.setting]}
        onChange={(event) => {
          let index = event.nativeEvent.selectedSegmentIndex;
          let setting = {[item.setting]: index};
          dispatch({type: 'SET_SETTING', payload: setting});
        }}
      />
    </View>
  );
};

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
export const PickerListItem = ({item, state, dispatch}) => {
  const styles = useDynamicValue(dynamicStyles);
  const DARKMODE = useDarkMode();
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
          dispatch({type: 'SET_SETTING', payload: {instrument: value}});
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
};

const dynamicStyles = new DynamicStyleSheet({
  listItemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: new DynamicValue(
      colors.systemGray3Light,
      colors.systemGray3Dark,
    ),
  },
  listSegmentedRowContainer: {
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    height: 45,
  },
  listButtonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    height: 45,
  },
  listPickerContainer: {
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    height: 45,
    alignItems: 'center',
  },
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  listRowText: {
    color: new DynamicValue(colors.black, colors.white),
    paddingVertical: 5,
  },
  linkText: {
    color: new DynamicValue(colors.orangeLight, colors.orangeDark),
    paddingRight: 5,
  },
});
