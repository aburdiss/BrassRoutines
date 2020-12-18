import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import LicensesListItem from './LicensesListItem';

/**
 * @description The list of licenses of dependencies used in this app.
 * Created with help from this article:
 * https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f
 * @author Alexander Burdiss
 * @since 12/17/2020
 */
const LicensesList = ({licenses}) => {
  return (
    <FlatList
      style={styles.list}
      keyExtractor={({key}) => key}
      data={licenses}
      renderItem={({item}) => <LicensesListItem {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default LicensesList;
