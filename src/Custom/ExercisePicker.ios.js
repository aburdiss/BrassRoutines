import React, {useContext} from 'react';
import {View, Pressable, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDarkMode} from 'react-native-dynamic';
import {PreferencesContext} from '../Model/Preferences';
import {colors, getExerciseDisplayName} from '../Model/Model';
import {useNavigation} from '@react-navigation/native';
import {translate} from '../Translations/TranslationModel';
import {previewExercise, getInstrumentExercises} from './exercisePickerHelpers';

/**
 * @description Renders an iOS styled picker displaying all of the exercises
 * for whatever instrument is selected. Handles the logic for checking the
 * current instrument, and displays a preview button that will open
 * ExerciseDetail.js with the correct instrument exercise. Will also indicate
 * whether or not the exercise is a favorite in the picker.
 * @author Alexander Burdiss
 * @since 1/13/21
 * @version 1.1.0
 *
 * @component
 * @example
 *   <ExercisePicker
 *     selectedExercise={selectedExercise}
 *     setSelectedExercise={setSelectedExercise}
 *   />
 */
const ExercisePicker = ({selectedExercise, setSelectedExercise}) => {
  const {state} = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '80%',
        }}>
        <Picker
          accessibilityLabel={selectedExercise}
          selectedValue={selectedExercise}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedExercise(itemValue)
          }
          itemStyle={{
            color: DARKMODE ? colors.white : colors.black,
          }}>
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
          style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
          <Text
            style={{
              color: DARKMODE ? colors.orangeDark : colors.orangeLight,
              fontSize: 16,
            }}>
            {translate('Preview')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ExercisePicker;
