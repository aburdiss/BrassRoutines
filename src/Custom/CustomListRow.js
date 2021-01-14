import React, {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import {
  DynamicValue,
  DynamicStyleSheet,
  useDynamicValue,
} from 'react-native-dynamic';
import SwipeableRow from './SwipeableRow';
import {colors} from '../Model/Model';
import {useNavigation} from '@react-navigation/native';
import {PreferencesContext} from '../Model/Preferences';
import {translate} from '../Translations/TranslationModel';

/**
 * @description One list row on the CustomList.js screen. Displays the user
 * inputted name as well as number of exercises. Allows user to delete or edit
 * routine from this swipeable row.
 * @author Alexander Burdiss
 * @since 1/3/21
 * @version 1.0.0
 * @param {Object} props.item The custom Routine item.
 *
 * @component
 * @example
 *   <CustomListRow item={item} />
 */
const CustomListRow = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const {state, dispatch} = useContext(PreferencesContext);

  /**
   * @function CustomListRow~deleteItem
   * @description Removes the routine from the app.
   * @author Alexander Burdiss
   * @since 12/29/20
   * @version 1.0.0
   */
  function deleteItem(item) {
    let filteredRoutines = state.customRoutines.filter(function (routine) {
      return routine.name !== item.item.name;
    });
    dispatch({type: 'ADD_TO_CUSTOM_ROUTINES', payload: filteredRoutines});
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
  function openEditRoutine(item) {
    navigation.navigate('Create Custom', {
      item: item.item,
      index: item.index,
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
  function startCustomRoutine(item) {
    navigation.navigate('Custom Routine', {item});
  }

  return (
    <SwipeableRow
      styles={styles}
      delete={deleteItem}
      item={item}
      edit={openEditRoutine}>
      <Pressable
        style={({pressed}) => ({
          opacity: pressed ? 0.7 : 1,
        })}
        onPress={() => {
          startCustomRoutine(item.item);
        }}
        onLongPress={item.drag}>
        <View style={styles.listItemContainer}>
          <View style={styles.listItemTextContainer}>
            <Text style={styles.listItemText}>{`${
              item.item.name
            } ${getExerciseLengthDescription()}`}</Text>
          </View>
        </View>
      </Pressable>
    </SwipeableRow>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  listItemContainer: {
    paddingLeft: 20,
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
  },
  listItemText: {
    paddingVertical: 15,
    color: new DynamicValue(colors.black, colors.white),
  },
  listItemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderBottomWidth: 1,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.redLight, colors.redDark),
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
    backgroundColor: new DynamicValue(colors.orangeLight, colors.orangeDark),
    justifyContent: 'flex-end',
  },
});

export default CustomListRow;
