/**
 * @function previewExercise
 * @memberof ExercisePicker
 * @description Opens the Exercise preview for the selected exercise and
 * selected instrument
 * Created 1/13/21
 * @param {Object} state The current app state.
 * @param {Object} navigation The current navigation object, provided by React
 * Navigation.
 * @param {number} selectedExercise The currently selected Exercise.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.1.2
 */
export function previewExercise(state, navigation, selectedExercise) {
  navigation.navigate('Exercise Detail', {
    instrument: state.instrument,
    item: selectedExercise,
  });
}
