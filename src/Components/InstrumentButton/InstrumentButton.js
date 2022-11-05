import React, { useContext } from 'react';
import { Pressable, Text } from 'react-native';
import { useDarkMode } from '../../utils';
import { PreferencesContext } from '../../Model/Preferences';
import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description One button on the Change Instrument Modal.
 * @author Alexander Burdiss
 * @since 1/25/21
 * @version 1.1.0
 *
 * @component
 * @example
 * ```jsx
<InstrumentButton
  text={text}
  setIsShowing={setIsShowing}
/>
```
 */
const InstrumentButton = ({ text, setIsShowing }) => {
  const { state, dispatch } = useContext(PreferencesContext);
  const DARKMODE = useDarkMode();

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
      })}
      accessibile={true}
      accessibilityHint={translate('Changes instrument')}
      accessibilityLabel={translate(text)}
    >
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontSize: 16,
          color:
            state?.instrument == text.toLowerCase()
              ? colors.black
              : DARKMODE
              ? colors.white
              : colors.black,
        }}
      >
        {translate(text)}
      </Text>
    </Pressable>
  );
};

export default InstrumentButton;
