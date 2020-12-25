import React, {useContext} from 'react';
import {View, Pressable, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Model/Model';
import {PreferencesContext} from '../Model/Preferences';

/// Placeholder for translate function
const translate = (text) => {
  return text;
};

/**
 * @description A component that renders the default list row on the listView.
 * @author Alexander Burdiss
 * @since 12/14/2020
 */
const ListRow = ({onPress, text}) => {
  const {state} = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();

  /**
   * @description A preprocess function to render The Major Scale Labels
   * correctly for the different instruments and for the different languages.
   * @author Alexander Burdiss
   * @since 12/17/20
   * @param {String} text Exercise Number to be preprocessed.
   */
  const getExerciseDisplayName = (text) => {
    switch (state.instrument) {
      case 'trumpet':
        switch (text) {
          case 1:
            return text + ' (' + translate('Remington Pattern') + ')';
          case 5:
            return text + ' (' + translate('Remington Variation') + ')';
          case 50:
            return text + ' (' + translate('C Major') + ')';
          case 51:
            return text + ' (' + translate('D♭ Major') + ')';
          case 52:
            return text + ' (' + translate('D Major') + ')';
          case 53:
            return text + ' (' + translate('E♭ Major') + ')';
          case 54:
            return text + ' (' + translate('E Major') + ')';
          case 55:
            return text + ' (' + translate('F Major') + ')';
          case 56:
            return text + ' (' + translate('F♯ Major') + ')';
          case 57:
            return text + ' (' + translate('G Major') + ')';
          case 58:
            return text + ' (' + translate('A♭ Major') + ')';
          case 59:
            return text + ' (' + translate('A Major') + ')';
          case 60:
            return text + ' (' + translate('B♭ Major') + ')';
          case 61:
            return text + ' (' + translate('B Major') + ')';
          default:
            return text;
        }
      case 'horn':
        switch (text) {
          case 1:
            return text + ' (' + translate('Remington Pattern') + ')';
          case 5:
            return text + ' (' + translate('Remington Variation') + ')';
          case 50:
            return text + ' (' + translate('C Major') + ')';
          case 51:
            return text + ' (' + translate('D♭ Major') + ')';
          case 52:
            return text + ' (' + translate('D Major') + ')';
          case 53:
            return text + ' (' + translate('E♭ Major') + ')';
          case 54:
            return text + ' (' + translate('E Major') + ')';
          case 55:
            return text + ' (' + translate('F Major') + ')';
          case 56:
            return text + ' (' + translate('F♯ Major') + ')';
          case 57:
            return text + ' (' + translate('G Major') + ')';
          case 58:
            return text + ' (' + translate('A♭ Major') + ')';
          case 59:
            return text + ' (' + translate('A Major') + ')';
          case 60:
            return text + ' (' + translate('B♭ Major') + ')';
          case 61:
            return text + ' (' + translate('B Major') + ')';
          default:
            return text;
        }
      case 'trombone':
        switch (text) {
          case 1:
            return text + ' (' + translate('Remington Pattern') + ')';
          case 5:
            return text + ' (' + translate('Remington Variation') + ')';
          case 50:
            return text + ' (' + translate('B♭ Major') + ')';
          case 51:
            return text + ' (' + translate('B Major') + ')';
          case 52:
            return text + ' (' + translate('C Major') + ')';
          case 53:
            return text + ' (' + translate('D♭ Major') + ')';
          case 54:
            return text + ' (' + translate('D Major') + ')';
          case 55:
            return text + ' (' + translate('E♭ Major') + ')';
          case 56:
            return text + ' (' + translate('E Major') + ')';
          case 57:
            return text + ' (' + translate('F Major') + ')';
          case 58:
            return text + ' (' + translate('G♭ Major') + ')';
          case 59:
            return text + ' (' + translate('G Major') + ')';
          case 60:
            return text + ' (' + translate('A♭ Major') + ')';
          case 61:
            return text + ' (' + translate('A Major') + ')';
          case 86:
            return text + ' (' + translate('Low Smears') + ')';
          default:
            return text;
        }
      case 'euphonium':
        if (state.bassClef == 1) {
          switch (text) {
            case 1:
              return text + ' (' + translate('Remington Pattern') + ')';
            case 5:
              return text + ' (' + translate('Remington Variation') + ')';
            case 50:
              return text + ' (' + translate('B♭ Major') + ')';
            case 51:
              return text + ' (' + translate('B Major') + ')';
            case 52:
              return text + ' (' + translate('C Major') + ')';
            case 53:
              return text + ' (' + translate('D♭ Major') + ')';
            case 54:
              return text + ' (' + translate('D Major') + ')';
            case 55:
              return text + ' (' + translate('E♭ Major') + ')';
            case 56:
              return text + ' (' + translate('E Major') + ')';
            case 57:
              return text + ' (' + translate('F Major') + ')';
            case 58:
              return text + ' (' + translate('G♭ Major') + ')';
            case 59:
              return text + ' (' + translate('G Major') + ')';
            case 60:
              return text + ' (' + translate('A♭ Major') + ')';
            case 61:
              return text + ' (' + translate('A Major') + ')';
            case 86:
              return text + ' (' + translate('Low Smears') + ')';
            default:
              return text;
          }
        } else {
          switch (text) {
            case 1:
              return text + ' (' + translate('Remington Pattern') + ')';
            case 5:
              return text + ' (' + translate('Remington Variation') + ')';
            case 50:
              return text + ' (' + translate('C Major') + ')';
            case 51:
              return text + ' (' + translate('D♭ Major') + ')';
            case 52:
              return text + ' (' + translate('D Major') + ')';
            case 53:
              return text + ' (' + translate('E♭ Major') + ')';
            case 54:
              return text + ' (' + translate('E Major') + ')';
            case 55:
              return text + ' (' + translate('F Major') + ')';
            case 56:
              return text + ' (' + translate('F♯ Major') + ')';
            case 57:
              return text + ' (' + translate('G Major') + ')';
            case 58:
              return text + ' (' + translate('A♭ Major') + ')';
            case 59:
              return text + ' (' + translate('A Major') + ')';
            case 60:
              return text + ' (' + translate('B♭ Major') + ')';
            case 61:
              return text + ' (' + translate('B Major') + ')';
            default:
              return text;
          }
        }
      case 'tuba':
        switch (text) {
          case 1:
            return text + ' (' + translate('Remington Pattern') + ')';
          case 5:
            return text + ' (' + translate('Remington Variation') + ')';
          case 50:
            return text + ' (' + translate('B♭ Major') + ')';
          case 51:
            return text + ' (' + translate('B Major') + ')';
          case 52:
            return text + ' (' + translate('C Major') + ')';
          case 53:
            return text + ' (' + translate('D♭ Major') + ')';
          case 54:
            return text + ' (' + translate('D Major') + ')';
          case 55:
            return text + ' (' + translate('E♭ Major') + ')';
          case 56:
            return text + ' (' + translate('E Major') + ')';
          case 57:
            return text + ' (' + translate('F Major') + ')';
          case 58:
            return text + ' (' + translate('G♭ Major') + ')';
          case 59:
            return text + ' (' + translate('G Major') + ')';
          case 60:
            return text + ' (' + translate('A♭ Major') + ')';
          case 61:
            return text + ' (' + translate('A Major') + ')';
          case 86:
            return text + ' (' + translate('Low Smears') + ')';
          default:
            return text;
        }
      default:
        throw new Error('Invalid Instrument Name');
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          paddingVertical: 8,
          height: 45,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
        }}>
        <Text style={{color: DARKMODE ? colors.white : colors.black}}>
          {getExerciseDisplayName(text)}
        </Text>
        {state.favorites.includes(text) ? (
          <Ionicons
            name="heart"
            size={24}
            color={DARKMODE ? colors.pinkDark : colors.pinkLight}
          />
        ) : null}
      </View>
    </Pressable>
  );
};

export default ListRow;
