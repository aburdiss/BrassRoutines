import React, { useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../../utils';
import { PreferencesContext } from '../../Model/Preferences';
import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function InstrumentButton
 * @component
 * @description One button on the Change Instrument Modal.
 * Created 1/25/21
 * @param {Object} props JSX props passed to this React component
 * @param {string} props.text Text to render on this button
 * @param {Function} props.setIsShowing A function that sets whether or not
 * the parent modal is showing
 * @returns {JSX.Element} JSX Render Instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/2/23
 * @version 1.1.1
 *
 * @example
 * <InstrumentButton
 *   text={text}
 *   setIsShowing={setIsShowing}
 * />
 */
export default function InstrumentButton({ text, setIsShowing }) {
  const { state, dispatch } = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();

  const styles = StyleSheet.create({
    pressable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor:
        state?.instrument == text.toLowerCase()
          ? DARKMODE
            ? colors.orangeDark
            : colors.orangeLight
          : null,
    },
    text: {
      fontSize: 16,
      color:
        state?.instrument == text.toLowerCase()
          ? colors.black
          : DARKMODE
          ? colors.white
          : colors.black,
    },
  });

  return (
    <Pressable
      onPress={() => {
        dispatch({
          type: 'SET_SETTING',
          payload: { instrument: text.toLowerCase() },
        });
        setIsShowing(false);
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1.0,
        ...styles.pressable,
      })}
      accessibile={true}
      accessibilityHint={translate('Changes instrument')}
      accessibilityLabel={translate(text)}
    >
      <Text style={styles.text}>{translate(text)}</Text>
    </Pressable>
  );
}
