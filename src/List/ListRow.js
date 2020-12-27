import React, {useContext} from 'react';
import {View, Pressable, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, getExerciseDisplayName} from '../Model/Model';
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
          {getExerciseDisplayName(text, state)}
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
