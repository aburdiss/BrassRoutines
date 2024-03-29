import React, { useContext } from 'react';
import { View, SectionList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import { colors } from '../../Model/Model';
import {
  INSTRUMENT,
  ROUTINE,
  FAVORITES,
  CUSTOM_ROUTINES,
  ABOUT,
  SETTINGS,
  RESOURCES,
} from '../../Model/SettingsModel';
import { PreferencesContext } from '../../Model/Preferences';
import TextListItem from '../../Components/ListItems/TextListItem/TextListItem';
import LinkListItem from '../../Components/ListItems/LinkListItem/LinkListItem';
import InternalListItem from '../../Components/ListItems/InternalListItem/InternalListItem';
import SwitchListItem from '../../Components/ListItems/SwitchListItem/SwitchListItem';
import ButtonListItem from '../../Components/ListItems/ButtonListItem/ButtonListItem';
import SegmentedControlListItem from '../../Components/ListItems/SegmentedControlListItem/SegmentedControlListItem';
import PickerListItem from '../../Components/ListItems/PickerListItem/PickerListItem';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode } from '../../utils';

/**
 * @function Settings
 * @component
 * @description A View that allows the user to set custom settings, or view
 * additional resources.
 * Created 12/14/20
 * @returns {JSX.Element}
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.0.2
 *
 * @example
 * <Settings />
 */
export default function Settings() {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    listHeader: {
      textTransform: 'uppercase',
      paddingLeft: 20,
      paddingTop: 30,
      paddingBottom: 10,
      color: DARKMODE ? colors.systemGray : colors.systemGray,
    },
    sectionList: {
      height: '100%',
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
    iconContainer: {
      flexDirection: 'row',
    },
    icon: {
      paddingHorizontal: 5,
    },
    javascriptBackground: {
      backgroundColor: colors.black,
      height: 20,
      width: 20,
      marginLeft: 7,
      marginTop: 3,
      zIndex: -1,
      position: 'absolute',
    },
    footerContainer: {
      paddingTop: 30,
      paddingBottom: 30,
      alignItems: 'center',
    },
    footerText: {
      color: colors.systemGray,
      paddingTop: 10,
    },
  });

  const { state, dispatch } = useContext(PreferencesContext);

  return (
    <SafeAreaView style={styles.sectionList} edges={['left', 'right']}>
      <SectionList
        sections={[
          { title: translate('Instrument'), data: INSTRUMENT },
          { title: translate('Routine'), data: ROUTINE },
          { title: translate('Favorites'), data: FAVORITES },
          { title: translate('Custom Routines'), data: CUSTOM_ROUTINES },
          { title: translate('Settings'), data: SETTINGS },
          { title: translate('Resources'), data: RESOURCES },
          { title: translate('About'), data: ABOUT },
        ]}
        keyExtractor={(item, index) => index}
        renderItem={function ({ item }) {
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
                <SegmentedControlListItem
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
        renderSectionHeader={({ section: { title } }) => (
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
                color={colors.reactColor}
              />
              <View>
                <View style={styles.javascriptBackground} />
                <Ionicons
                  accessibilityLabel={translate('JavaScript Icon')}
                  style={styles.icon}
                  name="logo-javascript"
                  size={24}
                  color={colors.javascriptColor}
                />
              </View>
            </View>
            <Text style={styles.footerText}>
              {translate('Made with ❤️ in Dayton, Ohio')}
            </Text>
            <Text style={styles.footerText}>{DeviceInfo.getVersion()}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
