import React from 'react';
import {
  Text,
  Pressable,
  View,
  Linking,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../Model/Model';
import { useDarkMode } from '../../../utils';

/**
 * @description A styled list item that contains links to the authors of the
 * various softwares used throughout the app, and the users who contributed
 * to them.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @date 12/17/20
 * @version 1.0.2
 * @param {String} props.image The url of the image to display.
 * @param {String} props.userUrl The url of the author of this software.
 * @param {String} props.username The username of the author of the software
 * using this license.
 * @param {String} props.name The name of the author of the software using this
 * license.
 * @param {String} props.version The version number of the software using this
 * license.
 * @param {String} props.licenses The text to render inside the main section
 * of this license link.
 * @param {String} props.repository The url of the Github repository to link
 * to.
 * @param {String} props.licenseUrl The url to the currently referenced
 * license.
 *
 * @component
 * @example
 * ```jsx
<LicensesListItem {...item} />
```
 */
const LicensesListItem = ({
  image,
  userUrl,
  username,
  name,
  version,
  licenses,
  repository,
  licenseUrl,
}) => {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    card: {
      overflow: 'hidden',
      flexDirection: 'row',
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
      alignItems: 'center',
      paddingLeft: 12,
    },
    forwardChevron: {
      alignSelf: 'center',
    },
    item: {
      paddingVertical: 12,
      paddingRight: 12,
      marginLeft: 12,
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      maxWidth: '100%',
      flexWrap: 'wrap',
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderBottomWidth: 1,
    },
    image: {
      aspectRatio: 1,
      width: 58,
      borderRadius: 29,
      backgroundColor: 'white',
    },
    name: {
      color: DARKMODE ? colors.white : colors.black,
      fontWeight: 'bold',
      fontSize: 16,
    },
    text: {
      color: DARKMODE ? colors.systemGray : colors.systemGray,
      marginTop: 3,
    },
    textContainer: {
      maxWidth: '90%',
    },
  });

  let title = name;
  if (username) {
    if (title.toLowerCase() != username.toLowerCase()) {
      title += ` by ${username}`;
    }
  }

  return (
    <View>
      <View style={styles.cardShadow}>
        <View style={styles.card}>
          {image && (
            <Pressable
              onPress={() => Linking.openURL(userUrl)}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </Pressable>
          )}
          <Pressable
            onPress={() => Linking.openURL(repository)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              ...styles.item,
            })}
          >
            <View style={styles.textContainer}>
              <Text style={styles.name}>{title}</Text>
              <Link style={styles.text} url={licenseUrl}>
                {licenses}
              </Link>
              <Link style={styles.text}>{version}</Link>
            </View>
            <Ionicons
              style={styles.forwardChevron}
              color={DARKMODE ? colors.orangeDark : colors.orangeLight}
              size={25}
              name={'chevron-forward-outline'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

/**
 * @description One link item that opens the main software link in the
 * LicensesListItem component. Text is limited to one line.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.1
 * @param {String} props.url The url to open when the element is tapped.
 * @param {Object} props.style Style to be applied to the element
 * @param {String} props.children Text to be rendered inside this element.
 *
 * @component
 * @example
 * ```jsx
<Link style={styles.text} url={licenseUrl}>
  {licenses}
</Link>
```
 */
const Link = ({ url, style, children }) => (
  <Text
    style={style}
    numberOfLines={1}
    onPress={() => url && Linking.openURL(url)}
  >
    {children}
  </Text>
);

export default LicensesListItem;
