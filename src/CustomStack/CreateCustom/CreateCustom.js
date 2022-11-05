/* eslint-disable no-unused-vars */
import React, {
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  Pressable,
  Dimensions,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import DraggableFlatList from 'react-native-draggable-flatlist';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import MainActionButton from '../../Components/MainActionButton/MainActionButton';
import ResetButton from '../../Components/ResetButton/ResetButton';
import HeaderButton from '../../Components/HeaderButton/HeaderButton';
import AddToListButton from '../../Components/AddToListButton/AddToListButton';
import ExercisePicker from '../ExercisePicker/ExercisePicker';
import SwipeableRow from '../../Components/SwipeableRow/SwipeableRow';
import { colors, getExerciseDisplayName } from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';
import { useIdleScreen, useDarkMode } from '../../utils';

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
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = {
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 0,
    },
    smallScreenButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderTopWidth: 1,
    },
    container: {
      flex: 1,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
    list: {
      flex: 1,
      borderTopColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderTopWidth: 1,
    },
    landscapeList: {
      flex: 1,
      borderRadius: 8,
      marginHorizontal: 10,
    },
    listIcon: {
      color: DARKMODE ? colors.pinkDark : colors.pinkLight,
    },
    listItemContainer: {
      paddingLeft: 20,
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
    },
    listItemText: {
      paddingVertical: 15,
      color: DARKMODE ? colors.white : colors.black,
    },
    listItemTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderBottomWidth: 1,
    },
    mainActionButton: {
      borderTopColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderTopWidth: 1,
    },
    placeholder: {
      color: colors.systemGray,
    },
    textInput: {
      borderColor: colors.systemGray,
      borderWidth: 1,
      borderRadius: 8,
      margin: 10,
      padding: 10,
      fontSize: 16,
      color: DARKMODE ? colors.white : colors.black,
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
  };
  const navigation = useNavigation();
  const route = useRoute();
  const { state, dispatch } = useContext(PreferencesContext);
  const [routineName, setRoutineName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(1);
  const [currentRoutine, setCurrentRoutine] = useState([]);
  const [counter, setCounter] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [routineCurrentIndex, setRoutineCurrentIndex] = useState(undefined);
  const [isPortrait, setIsPortrait] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useLayoutEffect(
    /**
     * @function CreateCustom~useLayoutEffect~setupNavigationOptions
     * @description On component mount and navigation update, this function
     * will add a custom back button with a custom handler that will prompt
     * the user about leaving with unsaved changes if they try to go back.
     * @author Alexander Burdiss
     * @since 2/8/21
     * @version 1.1.0
     */
    function setupNavigationOptions() {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderButton handler={handleBackButtonPress}>Back</HeaderButton>
        ),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigation],
  );

  useFocusEffect(
    useCallback(
      /**
       * @function CreateCustom~useFocusEffect~useCallback~handleAndroidBackButton
       * @description Handles the android back button press to prevent the user
       * from losing their custom routine.
       * @returns {Function} Cleanup function to remove the added event
       * listener.
       * @see CreateCustom~useFocusEffect~useCallback~handleAndroidBackButton~cleanupAndroidBackButton
       * @author Alexander Burdiss
       * @since 2/8/21
       * @version 1.0.0
       */
      function handleAndroidBackButton() {
        /**
         * @function CreateCustom~useFocusEffect~useCallback~handleAndroidBackButton~onBackPress
         * @description Calls the handleBackButtonPress function, and returns
         * true. Returning true is necessary to prevent the hardware back
         * button event from bubbling up to React Navigation, and will allow
         * the alert to show and let the user go back to save their work before
         * losing it all.
         * @see handleBackButtonPress
         * @author Alexander Burdiss
         * @since 2/8/21
         * @version 1.0.0
         * @returns {Boolean} true
         */
        function onBackPress() {
          handleBackButtonPress();
          return true;
        }
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        /**
         * @function CreateCustom~useFocusEffect~useCallback~handleAndroidBackButton~cleanupAndroidBackButton
         * @description Cleans up the event listener for the hardware back
         * button.
         * @author Alexander Burdiss
         * @since 2/8/21
         * @version 1.0.0
         */
        return function cleanupAndroidBackButton() {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
      },
      [handleBackButtonPress],
    ),
  );

  /**
   * @function CreateCustom~handleBackButtonPress
   * @description Alerts the user that they will lose changes, and navigates
   * them on Alert button press.
   * @author Alexander Burdiss
   * @since 1/25/21
   * @version 1.0.0
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setIsSmallScreen(getIsSmallScreen());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /**
   * @function CreateCustom~getIsSmallScreen
   * @description Checks whether the screen is small by checking it's longest
   * edge's width.
   * @author Alexander Burdiss
   * @since 1/28/21
   * @version 1.0.0
   * @returns {Boolean} A boolean of whether or not the screen is small.
   */
  function getIsSmallScreen() {
    const SMALL_SCREEN_HEIGHT = 675;
    if (getIsPortrait()) {
      return Dimensions.get('screen').height < SMALL_SCREEN_HEIGHT;
    } else {
      return Dimensions.get('screen').width < SMALL_SCREEN_HEIGHT;
    }
  }

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
   */
  const createRoutine = () => {
    if (routineName == '') {
      Alert.alert(translate('Please enter a name'));
    } else if (currentRoutine.length == 0) {
      Alert.alert(translate('Please select at least one exercise'));
    } else if (
      !editMode &&
      state.customRoutines.find((element) => element.name == routineName)
    ) {
      Alert.alert(
        translate('Routine') +
          " '" +
          routineName +
          "' " +
          translate('already exists'),
      );
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
      dispatch({ type: 'ADD_TO_CUSTOM_ROUTINES', payload: tempRoutines });
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
  function setNewRoutineOrder({ data }) {
    setCurrentRoutine(data);
  }

  /**
   * @function CreateCustom~triggerHapticFeedback
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

  return isPortrait ? (
    <View style={styles.container}>
      <TextInput
        value={routineName}
        placeholder={translate('Routine Name')}
        onChangeText={(text) => setRoutineName(text)}
        style={styles.textInput}
        placeholderTextColor={styles.placeholder.color}
      />
      <ExercisePicker
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
      />
      {!isSmallScreen ? (
        <View style={styles.buttonContainer}>
          <ResetButton handler={removeAllExercises} />
          <AddToListButton handler={addToExerciseList} />
        </View>
      ) : null}
      {/* <DraggableFlatList
        style={styles.list}
        data={currentRoutine}
        keyExtractor={(item, index) => String(index)}
        onDragEnd={setNewRoutineOrder}
        onDragBegin={triggerHapticFeedback}
        renderItem={({ item, drag }) => (
          <SwipeableRow
            key={`${item}${counter}`}
            styles={styles}
            delete={deleteElement}
            item={item}
          >
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
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
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
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{ paddingRight: 5 }}
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
      /> */}
      {isSmallScreen ? (
        <View style={styles.smallScreenButtonContainer}>
          <ResetButton handler={removeAllExercises} />
          <MainActionButton
            accessibilityLabel={
              editMode ? translate('Save Routine') : translate('Create Routine')
            }
            handler={createRoutine}
            text={editMode ? 'Save' : 'Create'}
          />
          <AddToListButton handler={addToExerciseList} />
        </View>
      ) : (
        <View style={styles.mainActionButton}>
          <MainActionButton
            accessibilityLabel={
              editMode ? translate('Save Routine') : translate('Create Routine')
            }
            handler={createRoutine}
            text={editMode ? 'Save' : 'Create'}
          />
        </View>
      )}
    </View>
  ) : (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...styles.container,
        flexDirection: 'row',
      }}
      edges={['left', 'right']}
    >
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flex: 1 }}>
        <ExercisePicker
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{ flex: 1 }} />
        <View style={styles.buttonContainer}>
          <ResetButton handler={removeAllExercises} />
          <AddToListButton handler={addToExerciseList} />
        </View>
      </View>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
        }}
      >
        <TextInput
          value={routineName}
          placeholder={translate('Routine Name')}
          onChangeText={(text) => setRoutineName(text)}
          style={styles.textInput}
          placeholderTextColor={styles.placeholder.color}
        />
        {/* <DraggableFlatList
          style={styles.landscapeList}
          data={currentRoutine}
          keyExtractor={(item, index) => String(index)}
          onDragEnd={setNewRoutineOrder}
          onDragBegin={triggerHapticFeedback}
          renderItem={({ item, drag }) => (
            <SwipeableRow
              key={`${item}${counter}`}
              styles={styles}
              delete={deleteElement}
              item={item}
            >
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
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
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
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{ paddingRight: 5 }}
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
        /> */}
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

export default CreateCustom;
