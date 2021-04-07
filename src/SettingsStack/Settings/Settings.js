import React, {useContext, useEffect} from 'react';
import {View, SectionList, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../Model/Model';
import {
  INSTRUMENT,
  ROUTINE,
  FAVORITES,
  CUSTOM_ROUTINES,
  ABOUT,
  RESOURCES,
} from '../../Model/SettingsModel';
import {PreferencesContext} from '../../Model/Preferences';
import {
  TextListItem,
  LinkListItem,
  InternalListItem,
  SwitchListItem,
  ButtonListItem,
  SegmentedFilterListItem,
  PickerListItem,
} from './SettingsListItems';
import {translate} from '../../Translations/TranslationModel';

/**
 * @description A View that allows the user to set custom settings, or view
 * additional resources.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0.1
 * 
 * @component
 * @example
 * ```jsx
<Settings />
```
 */
const Settings = () => {
  const styles = useDynamicValue(dynamicStyles);
  const {state, dispatch} = useContext(PreferencesContext);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.sectionList}>
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
              return <LinkListItem item={item} state={state} />;
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
        stickySectionHeadersEnabled={false}
        ListFooterComponent={
          <View style={styles.footerContainer} importantForAccessibility="no">
            <View style={styles.iconContainer}>
              <Ionicons
                accessibilityLabel={translate('React Native Icon')}
                style={styles.icon}
                name="logo-react"
                size={24}
                color={colors.systemGray}
              />
              <Ionicons
                accessibilityLabel={translate('JavaScript Icon')}
                style={styles.icon}
                name="logo-javascript"
                size={24}
                color={colors.systemGray}
              />
            </View>
            <Text style={styles.footerText}>
              {translate('Made with ❤️ in Dayton, Ohio')}
            </Text>
          </View>
        }
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
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    paddingHorizontal: 5,
  },
  footerContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: colors.systemGray,
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default Settings;
