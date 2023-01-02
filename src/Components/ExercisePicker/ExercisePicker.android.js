import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDarkMode } from '../../utils';
import { PreferencesContext } from '../../Model/Preferences';
import { colors } from '../../Model/Model';
import { getExerciseDisplayName } from '../../utils/getExerciseDisplayName';
import { useNavigation } from '@react-navigation/native';
import { translate } from '../../Translations/TranslationModel';
import { previewExercise } from './utils/previewExercise';
import { getInstrumentExercises } from './utils/getInstrumentExercises';

/**
 * @namespace ExercisePicker
 */

/**
 * @function ExercisePickerAndroid
 * @memberof ExercisePicker
 * @component
 * @description Renders an android styled picker displaying all of the
 * exercises for whatever instrument is selected. Handles the logic for
 * checking the current instrument, and displays a preview button that will
 * open ExerciseDetail.js with the correct instrument exercise. Will also
 * indicate whether or not the exercise is a favorite in the picker.
 * Created 1/13/21
 * @param {Object} props JSX props passed to this React component
 * @param {number} props.selectedExercise The currently selected exercise.
 * @param {Function} props.setSelectedExercise A function to update
 * props.selectedExercise
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.1.2
 *
 * @example
 *   <ExercisePicker
 *     selectedExercise={selectedExercise}
 *     setSelectedExercise={setSelectedExercise}
 *   />
 */
export default function ExercisePickerAndroid({
  selectedExercise,
  setSelectedExercise,
}) {
  const { state } = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();

  const styles = {
    exerciseButtonText: {
      color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      fontSize: 16,
    },
    innerWrapper: {
      width: '80%',
      borderColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
      borderWidth: 1,
      borderRadius: 8,
      marginHorizontal: 10,
    },
    outerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pickerItem: {
      color: DARKMODE ? colors.white : colors.black,
    },
  };

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.innerWrapper}>
        <Picker
          accessibilityLiveRegion="assertive"
          accessibilityLabel={String(selectedExercise)}
          selectedValue={selectedExercise}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedExercise(itemValue)
          }
          dropdownIconColor={DARKMODE ? '#FF9F0A' : '#FF9500'}
          itemStyle={styles.pickerItem}
        >
          {getInstrumentExercises(state).map((exercise) => (
            <Picker.Item
              label={`${
                state.favorites.includes(exercise) ? '❤️' : ''
              } ${getExerciseDisplayName(exercise, state)}`}
              value={exercise}
              key={exercise}
              color={DARKMODE ? colors.orangeDark : colors.orangeLight}
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
