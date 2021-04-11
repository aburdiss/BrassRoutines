import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SectionList, Text} from 'react-native';
import {
  colors,
  hornExercises,
  trumpetExercises,
  tromboneExercises,
  euphoniumExercises,
  tubaExercises,
} from '../../Model/Model';
import ListRow from './ListRow';
import SafeAreaView from 'react-native-safe-area-view';
import {PreferencesContext} from '../../Model/Preferences';
import {
  useDynamicValue,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dynamic';
import {translate} from '../../Translations/TranslationModel';

/**
 * @description A list of all of the exercises in the app, with icons to show
 * if they are in favorites or not.
 * @author Alexander Burdiss
 * @since 12/18/20
 * @version 1.1.0
 *
 * @component
 * @example
 *   <List />
 */
const List = () => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

  /**
   * @function List~getSections
   * @description Gets the section data depending on the instrument that is
   * selected, and returns a formatted list ready to pass into a
   * SectionList component.
   * @author Alexander Burdiss
   * @since 12/18/20
   * @version 1.0.0
   * @returns A formatted list of data ready to be passed into the SectionList.
   */
  const getSections = () => {
    let instrument;
    switch (state.instrument) {
      case 'horn':
        instrument = hornExercises;
        break;
      case 'trumpet':
        instrument = trumpetExercises;
        break;
      case 'trombone':
        instrument = tromboneExercises;
        break;
      case 'euphonium':
        instrument = euphoniumExercises;
        break;
      case 'tuba':
        instrument = tubaExercises;
        break;
      default:
        throw new Error('Invalid Instrument');
    }
    return [
      {title: translate('Long Tones'), data: instrument.longTones},
      {title: translate('Slow Lip Slurs'), data: instrument.slowLipSlurs},
      {title: translate('Fast Lip Slurs'), data: instrument.fastLipSlurs},
      {title: translate('Articulation'), data: instrument.articulation},
      {title: translate('Coordination'), data: instrument.coordination},
      {title: translate('Major Scales'), data: instrument.majorScales},
      {title: translate('High Range'), data: instrument.highRange},
      {title: translate('Low Range'), data: instrument.lowRange},
    ];
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        android_ripple={{
          color: colors.systemGray,
        }}
        sections={getSections()}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <ListRow
            text={item}
            onPress={() => {
              navigation.navigate('Exercise Detail', {
                item: item,
                instrument: state.instrument,
              });
            }}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  sectionHeader: {
    textTransform: 'uppercase',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    color: colors.systemGray,
  },
});

export default List;