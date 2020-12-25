import React, {useContext} from 'react';
import {SectionList, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {colors} from '../Model/Model';
import {
  INSTRUMENT,
  ROUTINE,
  FAVORITES,
  CUSTOM_ROUTINES,
  ABOUT,
  RESOURCES,
} from '../Model/SettingsModel';
import {PreferencesContext} from '../Model/Preferences';
import {
  TextListItem,
  LinkListItem,
  InternalListItem,
  SwitchListItem,
  ButtonListItem,
  SegmentedFilterListItem,
  PickerListItem,
} from './SettingsListItems';
// import {translate} from '../Translations/TranslationModel';
const translate = (text) => text;

/**
 * @description A View that allows the user to set custom settings, or view
 * additional resources.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0
 */
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
  listHeader: {
    textTransform: 'uppercase',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    color: new DynamicValue(colors.systemGray, colors.systemGray),
  },
  sectionList: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
});

export default Settings;
