import React, {useContext} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {PreferencesContext} from '../../Model/Preferences';
import {useNavigation} from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {colors} from '../../Model/Model';
import {
  DynamicValue,
  DynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dynamic';
import HomeButton from '../../Components/HomeButton/HomeButton';
import CustomListRow from './CustomListRow';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {translate} from '../../Translations/TranslationModel';

/**
 * @description A list of all of the custom routines the user has created. When
 * the list is empty, a button to create a routine renders in its place.
 * @author Alexander Burdiss
 * @since 1/2/21
 * @version 1.1.0
 *
 * @component
 * @example
 *   <CustomList />
 */
const CustomList = () => {
  const styles = useDynamicValue(dynamicStyles);
  const {state, dispatch} = useContext(PreferencesContext);
  const navigation = useNavigation();
  /**
   * @function CustomList~updateCustomRoutines
   * @description Updates the custom routines data in state. This is called
   * when the drag operation is complete.
   * @author Alexander Burdiss
   * @since 1/2/21
   * @version 1.0.0
   * @param {{[Number]}} {data} The new order that the custom routines should
   * be in.
   */
  function updateCustomRoutines({data}) {
    dispatch({type: 'SET_SETTING', payload: {customRoutines: data}});
  }

  /**
   * @function CustomList~triggerHapticFeedback
   * @description Triggers the standard haptic feedback option.
   * @author Alexander Burdiss
   * @since 2/8/21
   * @version 1.0.0
   */
  function triggerHapticFeedback() {
    ReactNativeHapticFeedback.trigger('selection', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {state.customRoutines.length == 0 ? (
        <HomeButton
          onPress={() => {
            navigation.navigate('Create Custom');
          }}>
          {translate('Create Routine')}
        </HomeButton>
      ) : (
        <DraggableFlatList
          data={state.customRoutines}
          keyExtractor={(item) => item.name}
          renderItem={(item) => <CustomListRow item={item} />}
          onDragEnd={updateCustomRoutines}
          onDragBegin={triggerHapticFeedback}
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