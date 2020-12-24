import React, {useContext} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {PreferencesContext} from '../Model/Preferences';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Model/Model';
import {
  DynamicValue,
  useDarkMode,
  DynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dynamic';
import HomeButton from '../Components/HomeButton';

const CustomList = () => {
  const styles = useDynamicValue(dynamicStyles);
  const {state} = useContext(PreferencesContext);
  const navigation = useNavigation();
  const DARKMODE = useDarkMode();
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
        // TODO: Create list to show different user created routines. Allow
        // user to name them, and change color of routines.
        <View />
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
