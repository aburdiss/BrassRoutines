import React, {useContext} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {FlatList} from 'react-native';
import {PreferencesContext} from '../Model/Preferences';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Model/Model';
import {
  DynamicValue,
  DynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dynamic';
import HomeButton from '../Components/HomeButton';
import CustomListRow from './CustomListRow';

const CustomList = () => {
  const styles = useDynamicValue(dynamicStyles);
  const {state} = useContext(PreferencesContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {state.customRoutines.length == 0 ? (
        <HomeButton
          onPress={() => {
            navigation.navigate('Create Custom');
          }}>
          Create Custom Routine
        </HomeButton>
      ) : (
        <FlatList
          data={state.customRoutines}
          keyExtractor={(item) => item.name}
          renderItem={(item) => <CustomListRow item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
});

export default CustomList;
