import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SectionList, Text, StyleSheet} from 'react-native';
import {
  colors,
  hornExercises,
  trumpetExercises,
  tromboneExercises,
  euphoniumExercises,
  tubaExercises,
} from '../Model/Model';
import ListRow from './ListRow';
import SafeAreaView from 'react-native-safe-area-view';
import {PreferencesContext} from '../Model/Preferences';
import {
  useDynamicValue,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dynamic';

const List = () => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

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
      {title: 'Long Tones', data: instrument.longTones},
      {title: 'Slow Lip Slurs', data: instrument.slowLipSlurs},
      {title: 'Fast Lip Slurs', data: instrument.fastLipSlurs},
      {title: 'Articulation', data: instrument.articulation},
      {title: 'Coordination', data: instrument.coordination},
      {title: 'Major Scales', data: instrument.majorScales},
      {title: 'High Range', data: instrument.highRange},
      {title: 'Low Range', data: instrument.lowRange},
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
