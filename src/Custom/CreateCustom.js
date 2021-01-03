import React, {useContext, useEffect, useState} from 'react';
import {View, TextInput, Text, Alert, Pressable} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {useNavigation, useRoute} from '@react-navigation/native';

import MainActionButton from '../Components/MainActionButton';
import ResetButton from '../Components/ResetButton';
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
  useEffect(function checkIfEditRoutine() {
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
  }, []);

  /**
   * @description Adds the user generated routine to local storage, and
   * navigates back to the custom routine list. If no exercises have been
   * added, or no title has been entered, displays the appropriate error
   * message.
   * @author Alexander Burdiss
   * @since 12/27/20
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

  const removeAllExercises = () => {
    setCurrentRoutine([]);
  };

  const addToExerciseList = () => {
    setCurrentRoutine([...currentRoutine, selectedExercise]);
    setCounter(counter + 1);
  };

  const deleteElement = (element) => {
    let temporaryExercises = [...currentRoutine];
    let index = temporaryExercises.indexOf(element);
    if (index !== -1) {
      temporaryExercises.splice(index, 1);
    }
    setCurrentRoutine(temporaryExercises);
  };

  function setNewRoutineOrder({data}) {
    setCurrentRoutine(data);
  }

  return (
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
              onLongPress={drag}
              style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
              <View style={styles.listItemContainer}>
                <View style={styles.listItemTextContainer}>
                  {state.favorites.includes(item) ? (
                    <Ionicons
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
        accessibilityValue={{text: `${translate('Create Custom Routine')}`}}
        handler={createRoutine}
        text={editMode ? 'Save' : 'Create'}
      />
    </View>
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
