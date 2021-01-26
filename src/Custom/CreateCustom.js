import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import SafeAreaView from 'react-native-safe-area-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {useNavigation, useRoute} from '@react-navigation/native';

import MainActionButton from '../Components/MainActionButton';
import ResetButton from '../Components/ResetButton';
import HeaderButton from '../Components/HeaderButton';
import AddToListButton from '../Components/AddToListButton';
import ExercisePicker from './ExercisePicker';
import SwipeableRow from './SwipeableRow';
import {colors, getExerciseDisplayName} from '../Model/Model';
import {PreferencesContext} from '../Model/Preferences';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A Component that allows the user to create a routine using the
 * different exercises in the app, and save it to internal memory. This
 * component is also used when editing a routine, and will remove the routine
 * in memory, and save the current routine in its place.
 * @author Alexander Burdiss
 * @since 1/2/21
 * @version 1.1.0
 *
 * @component
 * @example
 * ```jsx
<CreateCustom />
```
 */
const CreateCustom = () => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const route = useRoute();
  const {state, dispatch} = useContext(PreferencesContext);
  const [routineName, setRoutineName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(1);
  const [currentRoutine, setCurrentRoutine] = useState([]);
  const [counter, setCounter] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [routineCurrentIndex, setRoutineCurrentIndex] = useState(undefined);
  const [isPortrait, setIsPortrait] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton handler={handleBackButtonPress}>Back</HeaderButton>
      ),
    });
  }, [navigation]);

  /**
   * @function CreateCustom~handleBackButtonPress
   * @description Alerts the user that they will lose changes, and navigates
   * them on Alert button press.
   * @author Alexander Burdiss
   * @since 1/25/21
   * @version 1.0.0
   */
  function handleBackButtonPress() {
    Alert.alert(
      translate('All changes will be lost!'),
      translate('This cannot be undone!'),
      [
        {
          text: translate('Exit without saving'),
          onPress: () => navigation.goBack(),
        },
        {
          text: translate('Cancel'),
          style: 'cancel',
        },
      ],
    );
  }

  useEffect(
    /**
     * @function CreateCustom~useEffect~setupComponent
     * @summary Sets component up for edit mode, and checks orientation.
     * @description Checks to see if there are params passed in, and if so
     * sets the params passed in as the current routine, and sets the variables
     * necessary to edit the routine instead of create a new one. This funciton
     * also checks the orientation on mount and sets the state variable with
     * that information.
     * @author Alexander Burdiss
     * @since 1/2/21
     * @version 1.0.0
     */
    function setupComponent() {
      if (route.params != undefined) {
        setEditMode(true);
        setRoutineCurrentIndex(route.params.index);
        let routine = route.params.item.exercises.split(',').map(function (x) {
          return parseInt(x, 10);
        });
        setCurrentRoutine(routine);
        setRoutineName(route.params.item.name);
        navigation.setOptions({
          title: translate('Edit Routine'),
        });
      }
      setIsPortrait(getIsPortrait());
    },
    [],
  );

  /**
   * @function CreateCustom~getIsPortrait
   * @description Gets whether or not the component is in portrait mode.
   * @author Alexander Burdiss
   * @since 1/16/21
   * @version 1.0.0
   * @returns {Boolean} A boolean of whether or not the screen is in portrait
   * mode.
   */
  const getIsPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  Dimensions.addEventListener(
    'change',
    /**
     * @function CreateCustom~Dimensions.addEventListener~updatePortraitMode
     * @description Updates portrait mode state variable after calculating if the
     * device is in portrait mode.
     * @author Alexander Burdiss
     * @since 1/16/21
     * @version 1.0.0
     */
    function updatePortraitMode() {
      setIsPortrait(getIsPortrait());
    },
  );

  /**
   * @function CreateCustom~createRoutine
   * @description Adds the user generated routine to local storage, and
   * navigates back to the custom routine list. If no exercises have been
   * added, or no title has been entered, displays the appropriate error
   * message.
   * @author Alexander Burdiss
   * @since 12/27/20
   * @version 1.0.0
   *
   * @todo Check if name is unique, and if not, alert the user.
   */
  const createRoutine = () => {
    if (routineName == '') {
      Alert.alert(translate('Please enter a name'));
    } else if (currentRoutine.length == 0) {
      Alert.alert(translate('Please select at least one exercise'));
    } else {
      const tempRoutines = [...state.customRoutines];
      let currentRoutineObject = {
        name: routineName,
        exercises: String(currentRoutine),
      };
      if (editMode) {
        tempRoutines.splice(routineCurrentIndex, 1, currentRoutineObject);
      } else {
        tempRoutines.push(currentRoutineObject);
      }
      dispatch({type: 'ADD_TO_CUSTOM_ROUTINES', payload: tempRoutines});
      navigation.pop();
    }
  };

  /**
   * @function CreateCustom~removeAllExercises
   * @description Removes all exercises from current routine.
   * @author Alexander Burdiss
   * @since 12/27/20
   * @version 1.0.0
   */
  const removeAllExercises = () => {
    setCurrentRoutine([]);
  };

  /**
   * @function CreateCustom~addToExerciseList
   * @description Adds the currently selected exercise to the list.
   * @author Alexander Burdiss
   * @since 12/27/20
   * @version 1.0.0
   */
  const addToExerciseList = () => {
    setCurrentRoutine([...currentRoutine, selectedExercise]);
    setCounter(counter + 1);
  };

  /**
   * @function CreateCustom~deleteElement
   * @description Removes an exercise from the list. This function is passed
   * down to the right action on the swipeable elements.
   * @author Alexander Burdiss
   * @since 12/27/20
   * @version 1.0.0
   * @param {Number} element The exercise to be removed from the list.
   */
  const deleteElement = (element) => {
    let temporaryExercises = [...currentRoutine];
    let index = temporaryExercises.indexOf(element);
    if (index !== -1) {
      temporaryExercises.splice(index, 1);
    }
    setCurrentRoutine(temporaryExercises);
  };

  /**
   * @function CreateCustom~setNewRoutineOrder
   * @description Sets a new routine order. This function is called when the
   * drag operation is complete.
   * @author Alexander Burdiss
   * @since 1/2/21
   * @version 1.0
   * @param {{[Number]}} {data} The new order that the routine should be in.
   */
  function setNewRoutineOrder({data}) {
    setCurrentRoutine(data);
  }

  return isPortrait ? (
    <View style={styles.container}>
      <TextInput
        value={routineName}
        placeholder={translate('Routine Name')}
        onChangeText={(text) => setRoutineName(text)}
        style={styles.textInput}
      />
      <ExercisePicker
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
      />
      <View style={styles.buttonContainer}>
        <ResetButton handler={removeAllExercises} />
        <AddToListButton handler={addToExerciseList} />
      </View>
      <DraggableFlatList
        style={styles.list}
        data={currentRoutine}
        keyExtractor={(item, index) => String(index)}
        onDragEnd={setNewRoutineOrder}
        renderItem={({item, drag}) => (
          <SwipeableRow
            key={`${item}${counter}`}
            styles={styles}
            delete={deleteElement}
            item={item}>
            <Pressable
              onPress={() => {
                navigation.navigate('Exercise Detail', {
                  instrument: state.instrument,
                  item: item,
                });
              }}
              accessibilityRole="link"
              accessibilityHint={translate('Opens Exercise')}
              accessibilityLabel={
                getExerciseDisplayName(item, state) +
                (state.favorites.includes(item)
                  ? translate('This is a favorite exercise')
                  : '')
              }
              onLongPress={drag}
              style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
              <View style={styles.listItemContainer}>
                <View style={styles.listItemTextContainer}>
                  {state.favorites.includes(item) ? (
                    <Ionicons
                      accessibilityLabel={translate(
                        'This is a favorite exercise',
                      )}
                      name={'heart'}
                      color={styles.listIcon.color}
                      size={20}
                      style={{paddingRight: 5}}
                    />
                  ) : null}
                  <Text style={styles.listItemText}>
                    {getExerciseDisplayName(item, state)}
                  </Text>
                </View>
              </View>
            </Pressable>
          </SwipeableRow>
        )}
      />
      <MainActionButton
        accessibilityLabel={
          editMode ? translate('Save Routine') : translate('Create Routine')
        }
        handler={createRoutine}
        text={editMode ? 'Save' : 'Create'}
      />
    </View>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: new DynamicValue(
          colors.systemGray6Light,
          colors.black,
        ),
      }}>
      <View style={{width: '50%'}}>
        <ExercisePicker
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
        <View style={{flex: 1}} />
        <View style={styles.buttonContainer}>
          <ResetButton handler={removeAllExercises} />
          <AddToListButton handler={addToExerciseList} />
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <TextInput
          value={routineName}
          placeholder={translate('Routine Name')}
          onChangeText={(text) => setRoutineName(text)}
          style={styles.textInput}
        />
        <DraggableFlatList
          style={styles.landscapeList}
          data={currentRoutine}
          keyExtractor={(item, index) => String(index)}
          onDragEnd={setNewRoutineOrder}
          renderItem={({item, drag}) => (
            <SwipeableRow
              key={`${item}${counter}`}
              styles={styles}
              delete={deleteElement}
              item={item}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Exercise Detail', {
                    instrument: state.instrument,
                    item: item,
                  });
                }}
                accessibilityRole="link"
                accessibilityHint={translate('Opens Exercise')}
                accessibilityLabel={
                  getExerciseDisplayName(item, state) +
                  (state.favorites.includes(item)
                    ? translate('This is a favorite exercise')
                    : '')
                }
                onLongPress={drag}
                style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
                <View style={styles.listItemContainer}>
                  <View style={styles.listItemTextContainer}>
                    {state.favorites.includes(item) ? (
                      <Ionicons
                        accessibilityLabel={translate(
                          'This is a favorite exercise',
                        )}
                        name={'heart'}
                        color={styles.listIcon.color}
                        size={20}
                        style={{paddingRight: 5}}
                      />
                    ) : null}
                    <Text style={styles.listItemText}>
                      {getExerciseDisplayName(item, state)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </SwipeableRow>
          )}
        />
        <MainActionButton
          accessibilityLabel={
            editMode ? translate('Save Routine') : translate('Create Routine')
          }
          handler={createRoutine}
          text={editMode ? 'Save' : 'Create'}
        />
      </View>
    </SafeAreaView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  list: {
    flex: 1,
  },
  landscapeList: {
    flex: 1,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  listIcon: {
    color: new DynamicValue(colors.pinkLight, colors.pinkDark),
  },
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
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    fontSize: 16,
    color: new DynamicValue(colors.black, colors.white),
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
});

export default CreateCustom;
