import React from 'react';
import {Text, Pressable, View, Linking, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../Model/Model';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
  useDarkMode,
} from 'react-native-dynamic';

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
  const styles = useDynamicValue(dynamicStyles);
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
              style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
              <Image source={{uri: image}} style={styles.image} />
            </Pressable>
          )}
          <Pressable
            onPress={() => Linking.openURL(repository)}
            style={({pressed}) => ({
              opacity: pressed ? 0.7 : 1,
              ...styles.item,
            })}>
            <View style={{maxWidth: '90%'}}>
              <Text style={styles.name}>{title}</Text>
              <Link style={styles.text} url={licenseUrl}>
                {licenses}
              </Link>
              <Link style={styles.text}>{version}</Link>
            </View>
            <Ionicons
              style={{alignSelf: 'center'}}
              color={DARKMODE ? colors.orangeDark : colors.orangeLight}
              size={24}
              name={'chevron-forward'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const Link = ({url, style, children}) => (
  <Text
    style={style}
    numberOfLines={1}
    onPress={() => url && Linking.openURL(url)}>
    {children}
  </Text>
);

const dynamicStyles = new DynamicStyleSheet({
  card: {
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),

    alignItems: 'center',
    paddingLeft: 12,
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
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderBottomWidth: 1,
  },
  name: {
    color: new DynamicValue(colors.black, colors.white),
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    aspectRatio: 1,
    width: 58,
    borderRadius: 29,
    backgroundColor: 'white',
  },

  text: {
    color: new DynamicValue(colors.systemGray, colors.systemGray),
    marginTop: 3,
  },
});

export default LicensesListItem;
