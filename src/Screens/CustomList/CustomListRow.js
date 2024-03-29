import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import SwipeableRow from '../../Components/SwipeableRow/SwipeableRow';
import { colors } from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode } from '../../utils';

/**
 * @function CustomListRow
 * @component
 * @memberof CustomList
 * @description One list row on the CustomList.js screen. Displays the user
 * inputted name as well as number of exercises. Allows user to delete or edit
 * routine from this swipeable row.
 * Created 1/3/21
 * @param {Object} props JSX props passed to this React Component
 * @param {Object} props.item The custom Routine item.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdis
 * @since 1/4/23
 * @version 1.0.1
 *
 * @example
 * <CustomListRow item={item} />
 */
export default function CustomListRow({ item }) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    listItemContainer: {
      paddingHorizontal: 20,
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
    },
    listItemText: {
      paddingVertical: 15,
      color: DARKMODE ? colors.white : colors.black,
    },
    listItemTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderBottomWidth: 1,
    },
    rightAction: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: DARKMODE ? colors.redDark : colors.redLight,
      justifyContent: 'flex-end',
    },
    trashIcon: {
      paddingRight: 10,
      paddingLeft: 50,
    },
    pencilIcon: {
      paddingLeft: 10,
      paddingRight: 50,
    },
    leftAction: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
      justifyContent: 'flex-end',
    },
  });
  const navigation = useNavigation();
  const { state, dispatch } = useContext(PreferencesContext);

  /**
   * @function CustomListRow~deleteItem
   * @description Removes the routine from the app.
   * @author Alexander Burdiss
   * @since 12/29/20
   * @version 1.0.0
   */
  function deleteItem(itemToDelete) {
    let filteredRoutines = state.customRoutines.filter(function (routine) {
      return routine.name !== itemToDelete.item.name;
    });
    dispatch({ type: 'ADD_TO_CUSTOM_ROUTINES', payload: filteredRoutines });
  }

  /**
   * @function CustomListRow~openEditRoutine
   * @description Opens the Create Custom Routine View with the current list
   * of exercises already loaded into the list, to edit the routine.
   * @author Alexander Burdiss
   * @since 12/29/20
   * @version 1.0.0
   *
   * @todo make sure editing this routine either deletes the old one from state
   * or modifies the old one.
   */
  function openEditRoutine(itemToEdit) {
    navigation.navigate('Create Custom', {
      item: itemToEdit.item,
      index: itemToEdit.index,
    });
  }

  /**
   * @function CustomListRow~getExerciseLengthDescription
   * @description Gets the Length of the custom routine and returns a string
   * to print on the row of the length.
   * @author Alexander Burdiss
   * @since 12/29/20
   * @version 1.0.0
   */
  function getExerciseLengthDescription() {
    const customRoutineLength = item.item.exercises.split(',').length;

    if (customRoutineLength == 1) {
      return `(1 ${translate('exercise')})`;
    } else {
      return `(${customRoutineLength} ${translate('exercises')})`;
    }
  }

  /**
   * @function CustomListRow~startCustomRoutine
   * @description Gets the routine data from the item, and passes it into the
   * Routine View as it opens it.
   * @author Alexander Burdiss
   * @since 12/29/20
   * @version 1.0.0
   * @param {[Number]} item The Routine Object to pass to the Custom Routine
   * Component.
   */
  function startCustomRoutine(itemToStart) {
    navigation.navigate('Custom Routine', { item: itemToStart });
  }

  return (
    <SwipeableRow
      styles={styles}
      deleteElement={deleteItem}
      item={item}
      edit={openEditRoutine}
    >
      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
        })}
        onPress={() => {
          startCustomRoutine(item.item);
        }}
        onLongPress={item.drag}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.listItemTextContainer}>
            <Text style={styles.listItemText}>{`${
              item.item.name
            } ${getExerciseLengthDescription()}`}</Text>
            <Pressable
              hitSlop={10}
              onPress={() => {
                openEditRoutine(item);
              }}
            >
              <Ionicons
                name="pencil-outline"
                size={20}
                color={styles.listItemText.color}
              />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </SwipeableRow>
  );
}
