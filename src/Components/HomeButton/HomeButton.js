import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { useDarkMode } from '../../utils';
import { colors } from '../../Model/Model';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A styled button that renders on the home page of the app. This
 * is the main stylistic component of the front page of the app.
 * @author Alexander Burdiss
 * @since 12/3/20
 * @version 1.0.1
 * @param {Function} props.onPress The function to call when the button is
 * pressed.
 * @param {String} props.children The text to render on the button.
 *
 * @component
 * @example
 *   <HomeButton onPress={function}>
 *     Hello, World!
 *   </HomeButton>
 */
const HomeButton = ({ onPress, children, onLongPress }) => {
  const DARKMODE = useDarkMode();

  return (
    <View>
      <Pressable
        accessible={true}
        accessibilityLabel={children}
        accessibilityRole="link"
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => ({
          padding: 20,
          paddingBottom: children.startsWith('Begin Routine') ? 5 : 20,
          marginTop: 15,
          marginHorizontal: 10,
          backgroundColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
          opacity: pressed ? 0.7 : 1,
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
        })}
      >
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 20,
              color: colors.black,
              textAlign: 'right',
              flex: 1,
            }}
          >
            {children}
          </Text>
          <Ionicons
            name="play"
            size={20}
            color={colors.black}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              paddingLeft: 8,
            }}
          />
        </View>
        {children.endsWith(')') ? (
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              alignSelf: 'flex-end',
              paddingRight: 27,
            }}
          >
            {translate('Hold to change instrument')}
          </Text>
        ) : null}
      </Pressable>
    </View>
  );
};

export default HomeButton;
