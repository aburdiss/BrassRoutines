import React, { useContext } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDarkMode } from '../../utils';
import { PreferencesContext } from '../../Model/Preferences';
import { colors, getExerciseDisplayName } from '../../Model/Model';
import { useNavigation } from '@react-navigation/native';
import { translate } from '../../Translations/TranslationModel';
import {
  previewExercise,
  getInstrumentExercises,
} from './exercisePickerHelpers';

/**
 * @description Renders an iOS styled picker displaying all of the exercises
 * for whatever instrument is selected. Handles the logic for checking the
 * current instrument, and displays a preview button that will open
 * ExerciseDetail.js with the correct instrument exercise. Will also indicate
 * whether or not the exercise is a favorite in the picker.
 * @author Alexander Burdiss
 * @since 1/13/21
 * @version 1.1.1
 * @param {Number} props.selectedExercise The currently selected exercise.
 * @param {Function} props.setSelectedExercise A function to update
 * props.selectedExercise
 *
 * @component
 * @example
 *   <ExercisePicker
 *     selectedExercise={selectedExercise}
 *     setSelectedExercise={setSelectedExercise}
 *   />
 */
export default function ExercisePicker({
  selectedExercise,
  setSelectedExercise,
}) {
  const { state } = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    exerciseButtonText: {
      color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      fontSize: 16,
    },
    innerWrapper: {
      width: '80%',
    },
    outerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pickerItem: {
      color: DARKMODE ? colors.white : colors.black,
    },
  });

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.innerWrapper}>
        <Picker
          accessibilityLabel={selectedExercise}
          selectedValue={selectedExercise}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedExercise(itemValue)
          }
          itemStyle={styles.pickerItem}
        >
          {getInstrumentExercises(state).map((exercise) => (
            <Picker.Item
              label={`${
                state.favorites.includes(exercise) ? '❤️' : ''
              } ${getExerciseDisplayName(exercise, state)}`}
              value={exercise}
              key={exercise}
            />
          ))}
        </Picker>
      </View>
      <View>
        <Pressable
          accessibilityRole="link"
          accessibilityHint="Opens Exercise"
          onPress={() => previewExercise(state, navigation, selectedExercise)}
          hitSlop={10}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Text style={styles.exerciseButtonText}>{translate('Preview')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
