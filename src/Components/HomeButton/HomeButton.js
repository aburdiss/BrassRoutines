import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../../utils';
import { colors } from '../../Model/Model';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function HomeButton
 * @component
 * @description A styled button that renders on the home page of the app. This
 * is the main stylistic component of the front page of the app.
 * Created 12/3/20
 * @param {Object} props JSX props passed to this React Component
 * @param {Function} props.onPress The function to call when the button is
 * pressed.
 * @param {string} props.children The text to render on the button.
 * @returns {JSX.Element} JSX Render Instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.0.2
 *
 * @example
 *   <HomeButton onPress={function}>
 *     Hello, World!
 *   </HomeButton>
 */
export default function HomeButton({ onPress, children, onLongPress }) {
  const DARKMODE = useDarkMode();

  const styles = StyleSheet.create({
    playIcon: {
      paddingLeft: 8,
    },
    pressable: {
      padding: 20,
      paddingBottom: children.startsWith('Begin Routine') ? 5 : 20,
      marginTop: 15,
      marginHorizontal: 10,
      backgroundColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
      borderRadius: 8,
      borderBottomColor: DARKMODE ? colors.yellowDark : colors.yellowLight,
      borderBottomWidth: 1,
      shadowColor: DARKMODE ? colors.white : colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    text: {
      fontSize: 20,
      color: colors.black,
      textAlign: 'right',
      flex: 1,
    },
    textWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    subText: {
      alignSelf: 'flex-end',
      paddingRight: 27,
    },
  });

  return (
    <View>
      <Pressable
        accessible={true}
        accessibilityLabel={children}
        accessibilityRole="link"
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
          ...styles.pressable,
        })}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{children}</Text>
          <Ionicons
            name="play"
            size={20}
            color={colors.black}
            style={styles.playIcon}
          />
        </View>
        {children.endsWith(')') ? (
          <Text style={styles.subText}>
            {translate('Hold to change instrument')}
          </Text>
        ) : null}
      </Pressable>
    </View>
  );
}
