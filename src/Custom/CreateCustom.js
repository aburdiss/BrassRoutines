import React, {useContext, useState} from 'react';
import {View, TextInput, FlatList, Text} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MainActionButton from '../Components/MainActionButton';
import ResetButton from '../Components/ResetButton';
import AddToListButton from '../Components/AddToListButton';
import ExercisePicker from './ExercisePicker';
import SwipeableRow from './SwipeableRow';
import {colors, getExerciseDisplayName} from '../Model/Model';
import {PreferencesContext} from '../Model/Preferences';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

// Placeholder for translate function
const translate = (text) => text;

const CreateCustom = () => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();
  const {state, dispatch} = useContext(PreferencesContext);
  const [routineName, setRoutineName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(1);
  const [currentRoutine, setCurrentRoutine] = useState([]);
  const [counter, setCounter] = useState(0);

  /**
   * @description Adds the user generated routine to local storage, and
   * navigates back to the custom routine list. If no exercises have been
   * added, or no title has been entered, displays the appropriate error
   * message.
   * @author Alexander Burdiss
   * @since 12/27/20
   */
  const createRoutine = () => {
    // TODO: Check if name is unique!
    if (routineName == '') {
      Alert.alert('Please enter a name');
    } else if (currentRoutine.length == 0) {
      Alert.alert('Please select at least one exercise');
    } else {
      const tempRoutines = [...state.customRoutines];
      let currentRoutineObject = {
        name: routineName,
        exercises: String(currentRoutine),
      };
      tempRoutines.push(currentRoutineObject);
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

  return (
    <View style={styles.container}>
      <TextInput
        value={routineName}
        placeholder={'Routine Name'}
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
      <FlatList
        style={styles.list}
        data={currentRoutine}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => (
          <SwipeableRow
            key={`${item}${counter}`}
            styles={styles}
            delete={deleteElement}
            item={item}>
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
          </SwipeableRow>
        )}
      />
      <MainActionButton
        accessibilityValue={{text: `${translate('Create Custom Routine')}`}}
        handler={createRoutine}
        text={'Create'}
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
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.redLight, colors.redDark),
    flex: 1,
    justifyContent: 'flex-end',
  },
  trashIcon: {
    paddingRight: 10,
  },
});

export default CreateCustom;
