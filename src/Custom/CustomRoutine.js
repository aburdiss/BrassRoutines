import React, {useContext} from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Routine from '../Components/Routine/Routine';
import {PreferencesContext} from '../Model/Preferences';

/**
 * @description Displays a custom routine.
 * @author Alexander Burdiss
 * @since 12/29/20
 * @version 1.0.0
 *
 * @component
 * @example
 *   <CustomRoutine />
 */
const CustomRoutine = () => {
  const route = useRoute();
  const {state} = useContext(PreferencesContext);
  const exercises = route.params.item.exercises.split(',').map(function (x) {
    return parseInt(x, 10);
  });
  return (
    <View>
      <Routine exercises={exercises} instrument={state.instrument} />
    </View>
  );
};

export default CustomRoutine;
