import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PreferencesContext } from '../../Model/Preferences';
import { useNavigation } from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { colors } from '../../Model/Model';
import HomeButton from '../../Components/HomeButton/HomeButton';
import CustomListRow from './CustomListRow';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode } from '../../utils';
import { StyleSheet } from 'react-native';

/**
 * @namespace CustomList
 */

/**
 * @function CustomList
 * @memberof CustomList
 * @component
 * @description A list of all of the custom routines the user has created. When
 * the list is empty, a button to create a routine renders in its place.
 * Created 1/2/21
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.1.1
 *
 * @example
 * <CustomList />
 */
export default function CustomList() {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
  });

  const { state, dispatch } = useContext(PreferencesContext);
  const navigation = useNavigation();
  /**
   * @function updateCustomRoutines
   * @memberof CustomList
   * @description Updates the custom routines data in state. This is called
   * when the drag operation is complete.
   * @param {{[Number]}} {data} The new order that the custom routines should
   * be in.
   *
   * @author Alexander Burdiss
   * @since 1/2/21
   * @version 1.0.0
   */
  function updateCustomRoutines({ data }) {
    dispatch({ type: 'SET_SETTING', payload: { customRoutines: data } });
  }

  /**
   * @function triggerHapticFeedback
   * @memberof CustomList
   * @description Triggers the standard haptic feedback option.
   *
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
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {state.customRoutines.length == 0 ? (
        <HomeButton
          onPress={() => {
            navigation.navigate('Create Custom');
          }}
        >
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
}
