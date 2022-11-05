import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
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
 * @description Renders an android styled picker displaying all of the
 * exercises for whatever instrument is selected. Handles the logic for
 * checking the current instrument, and displays a preview button that will
 * open ExerciseDetail.js with the correct instrument exercise. Will also
 * indicate whether or not the exercise is a favorite in the picker.
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
 *
 * @todo Restyle these to work on android.
 */
const ExercisePicker = ({ selectedExercise, setSelectedExercise }) => {
  const { state } = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '80%',
          borderColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
          borderWidth: 1,
          borderRadius: 8,
          marginHorizontal: 10,
        }}
      >
        <Picker
          accessibilityLiveRegion="assertive"
          accessibilityLabel={String(selectedExercise)}
          selectedValue={selectedExercise}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedExercise(itemValue)
          }
          dropdownIconColor={DARKMODE ? '#FF9F0A' : '#FF9500'}
          itemStyle={{
            color: DARKMODE ? colors.white : colors.black,
          }}
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
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: DARKMODE ? colors.orangeDark : colors.orangeLight,
              fontSize: 16,
            }}
          >
            {translate('Preview')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ExercisePicker;
