import React, {useContext, useState, useEffect} from 'react';
import {
  SectionList,
  View,
  Pressable,
  Text,
  Linking,
  Switch,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaView from 'react-native-safe-area-view';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDarkMode,
  useDynamicValue,
} from 'react-native-dynamic';
import SegmentedControl from '@react-native-community/segmented-control';
import RNPickerSelect from 'react-native-picker-select';
import {colors} from '../Model/Model';
import {
  INSTRUMENT,
  ROUTINE,
  ROUTINE_LENGTH,
  FAVORITES,
  CUSTOM_ROUTINES,
  ABOUT,
  RESOURCES,
} from './SettingsModel';
import {PreferencesContext} from '../Model/Preferences';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {translate} from '../Translations/TranslationModel';
const translate = (text) => text;

/**
 * @description A rendered Text list item.
 * @author Alexander Burdiss
 * @since 11/15/20
 */
const TextListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.listRowContainer}>
      <Text style={styles.listRowText}>{translate(item.value)}</Text>
    </View>
  );
};

/**
 * @description A rendered Link list item with a chevron and theme colored text
 * @author Alexander Burdiss
 * @since 11/15/20
 */
const LinkListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <Pressable
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      onPress={() => {
        Linking.openURL(item.link);
      }}>
      <View style={styles.listRowContainer}>
        <Text style={styles.linkText}>{translate(item.value)}</Text>
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
 * the current stack.
 * @author Alexander Burdiss
 * @since 12/17/20
 */
const InternalListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();

  return (
    <Pressable
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      onPress={() => {
        navigation.navigate(item.component);
      }}>
      <View style={styles.listRowContainer}>
        <Text style={styles.linkText}>{translate(item.value)}</Text>
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
 * @since 12/14/20
 */
const SwitchListItem = ({item, state, dispatch}) => {
  const styles = useDynamicValue(dynamicStyles);
  return (
    <View style={styles.listRowContainer}>
      <Text style={styles.listRowText}>{item.value}</Text>
      <Switch
        value={state[item.setting]}
        onValueChange={(state) => {
          let newSetting = {[item.setting]: state};
          dispatch({type: 'SET_SETTING', payload: newSetting});
        }}
      />
    </View>
  );
};

/**
 * @description A rendered Button list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 12/17/20
 */
const ButtonListItem = ({item, dispatch}) => {
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
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}>
      <View style={styles.listButtonRowContainer}>
        <Text style={styles.linkText}>{translate(item.value)}</Text>
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
 */
const SegmentedFilterListItem = ({item, state, dispatch}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.listSegmentedRowContainer}>
      <SegmentedControl
        values={item.choices}
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

const PickerListItem = ({item, state, dispatch}) => {
  const styles = useDynamicValue(dynamicStyles);
  const DARKMODE = useDarkMode();
  const [currentInstrument, setCurrentInstrument] = useState(state.instrument);
  useEffect(() => {
    setCurrentInstrument(state.instrument);
  }, [state.instrument]);

  return (
    <View style={styles.listSegmentedRowContainer}>
      <RNPickerSelect
        onValueChange={(value) => {
          setCurrentInstrument(value);
          dispatch({type: 'SET_SETTING', payload: {instrument: value}});
        }}
        value={currentInstrument}
        items={item.values}
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

/**
 * @description A View that allows the user to set custom settings, or view
 * additional resources.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0
 */

// TODO: Setup Instrument Picker to open a sheet.
const Settings = () => {
  const styles = useDynamicValue(dynamicStyles);
  const {state, dispatch} = useContext(PreferencesContext);

  return (
    <SafeAreaView>
      <SectionList
        sections={[
          {title: translate('Instrument'), data: INSTRUMENT},
          {title: translate('Routine'), data: ROUTINE},
          {title: translate('Favorites'), data: FAVORITES},
          {title: translate('Custom Routines'), data: CUSTOM_ROUTINES},
          {title: translate('Resources'), data: RESOURCES},
          {title: translate('About'), data: ABOUT},
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          switch (item.type) {
            case 'link':
              return <LinkListItem item={item} />;
            case 'navigate':
              return <InternalListItem item={item} />;
            case 'text':
              return <TextListItem item={item} />;
            case 'switch':
              return (
                <SwitchListItem item={item} state={state} dispatch={dispatch} />
              );
            case 'button':
              return <ButtonListItem item={item} dispatch={dispatch} />;
            case 'segmentedFilter':
              return (
                <SegmentedFilterListItem
                  item={item}
                  state={state}
                  dispatch={dispatch}
                />
              );
            case 'picker':
              return (
                <PickerListItem dispatch={dispatch} state={state} item={item} />
              );
            default:
              return null;
          }
        }}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        style={styles.sectionList}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
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
  listHeader: {
    textTransform: 'uppercase',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    color: new DynamicValue(colors.systemGray, colors.systemGray),
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
    height: 45,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  listRowText: {
    color: new DynamicValue(colors.black, colors.white),
  },
  linkText: {
    color: new DynamicValue(colors.orangeLight, colors.orangeDark),
    paddingRight: 5,
  },
  sectionList: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
});

export default Settings;
