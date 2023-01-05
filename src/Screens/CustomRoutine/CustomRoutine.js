import React, { useContext } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Routine from '../../Components/Routine/Routine';
import { PreferencesContext } from '../../Model/Preferences';
import { useIdleScreen } from '../../utils';

/**
 * @function CustomRoutine
 * @component
 * @description Displays a custom routine.
 * Created 12/29/20
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/4/23
 * @version 1.0.1
 *
 * @example
 * <CustomRoutine />
 */
export default function CustomRoutine() {
  useIdleScreen();

  const route = useRoute();
  const { state } = useContext(PreferencesContext);
  const exercises = route.params.item.exercises.split(',').map(function (x) {
    return parseInt(x, 10);
  });
  return (
    <View>
      <Routine exercises={exercises} instrument={state.instrument} />
    </View>
  );
}
