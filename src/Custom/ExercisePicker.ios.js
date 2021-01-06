import React, {useContext} from 'react';
import {View, Pressable, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDarkMode} from 'react-native-dynamic';
import {PreferencesContext} from '../Model/Preferences';
import {
  colors,
  allHornExercises,
  allTrumpetExercises,
  allTromboneExercises,
  allEuphoniumExcercises,
  allTubaExercises,
  getExerciseDisplayName,
} from '../Model/Model';
import {useNavigation} from '@react-navigation/native';
import {translate} from '../Translations/TranslationModel';

/**
 * @description Renders an iOS styled picker displaying all of the exercises
 * for whatever instrument is selected. Handles the logic for checking the
 * current instrument, and displays a preview button that will open
 * ExerciseDetail.js with the correct instrument exercise. Will also indicate
 * whether or not the exercise is a favorite in the picker.
 * @author Alexander Burdiss
 * @since 12/27/20
 */
const ExercisePicker = ({selectedExercise, setSelectedExercise}) => {
  const {state} = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();

  /**
   * @description Opens the Exercise preview for the selected exercise and
   * selected instrument
   * @author Alexander Burdiss
   * @since 12/27/20
   */
  const previewExercise = () => {
    navigation.navigate('Exercise Detail', {
      instrument: state.instrument,
      item: selectedExercise,
    });
  };

  /**
   * @description Gets the proper list of exercises depending on the selected
   * instrument
   * @author Alexander Burdiss
   * @since 12/27/20
   */
  const getInstrumentExercises = () => {
    switch (state.instrument) {
      case 'horn':
        return allHornExercises;
      case 'trumpet':
        return allTrumpetExercises;
      case 'trombone':
        return allTromboneExercises;
      case 'euphonium':
        return allEuphoniumExcercises;
      case 'tuba':
        return allTubaExercises;
      default:
        throw new Error('Invalid Instrument');
    }
  };

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
          {getInstrumentExercises().map((exercise) => (
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
          onPress={previewExercise}
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
