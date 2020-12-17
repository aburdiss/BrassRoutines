import React from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dynamic';
import {colors} from '../Model/Model';
// import {translate} from '../Translations/TranslationModel';
const translate = (text) => text;

const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/developer?id=Alexander+Burdiss';
const APPLE_STORE_LINK =
  'https://apps.apple.com/us/developer/alexander-burdiss/id1496727055';

const FUNDAMENTALS = [
  {
    id: '0',
    type: 'switch',
    value: 'Long Tones',
  },
  {
    id: '1',
    type: 'switch',
    value: 'Slow Lip Slurs',
  },
  {
    id: '2',
    type: 'switch',
    value: 'Fast Lip Slurs',
  },
  {
    id: '3',
    type: 'switch',
    value: 'Single Note Articulation',
  },
  {
    id: '4',
    type: 'switch',
    value: 'Changing Note Articulation',
  },
  {
    id: '5',
    type: 'switch',
    value: 'Major Scales',
  },
  {
    id: '6',
    type: 'switch',
    value: 'High Range',
  },
  {
    id: '7',
    type: 'switch',
    value: 'Low Range',
  },
];

const ROUTINE_LENGTH = [
  {
    id: '8',
    type: 'segmentedFilter',
    choices: ['Short', 'Medium', 'Long'],
    setting: 'routineLength',
  },
];

const FAVORITES = [
  {
    id: '9',
    type: 'button',
    value: 'Reset Favorites',
    icon: 'heart-dislike-outline',
  },
];

const CUSTOM_ROUTINES = [
  {
    id: '10',
    type: 'button',
    value: 'Reset Custom Routines',
    icon: 'trash-outline',
  },
];

const RESOURCES = [
  {
    id: '0',
    type: 'link',
    value: 'More Apps by Alexander Burdiss',
    link:
      DeviceInfo.getBrand() === 'Apple' ? APPLE_STORE_LINK : GOOGLE_PLAY_LINK,
  },
  {
    id: '1',
    type: 'link',
    value: 'Visit Ars Nova Publishing',
    link: 'https://www.arsnovapublishing.com/',
  },
  {
    id: '2',
    type: 'link',
    value: 'Visit Band Room Online',
    link: 'https://www.bandroomonline.com/',
  },
];

const ABOUT = [
  {
    id: '3',
    type: 'text',
    value: `© ${new Date().getFullYear()} ` + 'Alexander Burdiss',
  },
  {
    id: '4',
    type: 'link',
    value: 'Send Feedback',
    link: 'mailto:aburdiss@icloud.com',
  },
];

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
 * @description A rendered Switch list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 12/14/20
 */
const SwitchListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.listRowContainer}>
      <Text>{item.value}</Text>
      <Switch onValueChange={() => {}} />
    </View>
  );
};

/**
 * @description A rendered Button list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 12/17/20
 */
const ButtonListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <Pressable>
      <View style={styles.listRowContainer}>
        <Text style={styles.linkText}>{translate(item.value)}</Text>
        <Ionicons name={item.icon} size={25} color={styles.linkText.color} />
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
const SegmentedFilterListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.listRowContainer}>
      <Text>{item.choices}</Text>
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
const Settings = () => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <SafeAreaView>
      <SectionList
        sections={[
          {title: translate('Fundamentals'), data: FUNDAMENTALS},
          {title: translate('Routine Length'), data: ROUTINE_LENGTH},
          {title: translate('Favorites'), data: FAVORITES},
          {title: translate('Custom Routines'), data: CUSTOM_ROUTINES},
          {title: translate('Resources'), data: RESOURCES},
          {title: translate('About'), data: ABOUT},
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          if (item.type == 'link') {
            return <LinkListItem item={item} />;
          } else if (item.type === 'text') {
            return <TextListItem item={item} />;
          } else if (item.type === 'switch') {
            return <SwitchListItem item={item} />;
          } else if (item.type === 'button') {
            return <ButtonListItem item={item} />;
          } else if (item.type === 'segmentedFilter') {
            return <SegmentedFilterListItem item={item} />;
          } else {
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
  },
  sectionList: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
});

export default Settings;
