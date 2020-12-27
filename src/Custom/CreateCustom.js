import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import RandomizeButton from '../Components/RandomizeButton';
import ExercisePicker from './ExercisePicker';

// Placeholder for translate function
const translate = (text) => text;

const CreateCustom = () => {
  const [routineName, setRoutineName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(1);

  /**
   * @description Adds the user generated routine to local storage, and
   * navigates back to the custom routine list. If no exercises have been
   * added, or no title has been entered, displays the appropriate error
   * message.
   * @author Alexander Burdiss
   * @since 12/27/20
   */
  const createRoutine = () => {};

  return (
    <View>
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
      <RandomizeButton
        accessibilityValue={{text: `${translate('Create Custom Routine')}`}}
        handler={createRoutine}
        text={'Create'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
});

export default CreateCustom;
