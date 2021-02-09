import React, {useContext, useEffect} from 'react';
import {View, SectionList, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../Model/Model';
import {TRANSLATIONS, EXERCISES} from '../Model/AcknowledgementsModel';
import {TextListItem} from './SettingsListItems';
import {translate} from '../Translations/TranslationModel';

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
const Acknowledgements = () => {
  const styles = useDynamicValue(dynamicStyles);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.sectionList}>
      <SectionList
        sections={[
          {title: translate('Translations'), data: TRANSLATIONS},
          {title: translate('exercises'), data: EXERCISES},
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => <TextListItem item={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
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

export default Acknowledgements;
