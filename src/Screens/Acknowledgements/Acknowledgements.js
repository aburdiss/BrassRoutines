import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../Model/Model';
import { TRANSLATIONS, EXERCISES } from '../../Model/AcknowledgementsModel';
import TextListItem from '../../Components/ListItems/TextListItem/TextListItem';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode } from '../../utils';

/**
 * @function Acknowledgements
 * @component
 * @description A View that displays the people who directly assisted with
 * this project
 * Created 12/14/20
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.0.3
 *
 * @example
 * <Acknowledgements />
 */
export default function Acknowledgements() {
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

  return (
    <SafeAreaView style={styles.sectionList} edges={['left', 'right']}>
      <SectionList
        sections={[
          { title: translate('Translations'), data: TRANSLATIONS },
          { title: translate('exercises'), data: EXERCISES },
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <TextListItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}
