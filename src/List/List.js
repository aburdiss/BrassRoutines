import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SectionList, Text, StyleSheet} from 'react-native';
import {colors, tromboneExercises} from '../Model/Model';
import ListRow from './ListRow';
import SafeAreaView from 'react-native-safe-area-view';

// TODO: Make a preprocess function that adds Major Scale Names to exercises.
const List = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <SectionList
        android_ripple={{
          color: colors.systemGray,
        }}
        sections={tromboneExercises}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <ListRow
            text={item}
            onPress={() => {
              navigation.navigate('Exercise Detail', item);
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

const styles = StyleSheet.create({
  sectionHeader: {
    textTransform: 'uppercase',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    color: colors.systemGray,
  },
});

export default List;
