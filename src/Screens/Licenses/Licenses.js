import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LicensesList from '../../Components/LicensesList/LicensesList';
import { colors } from '../../Model/Model';

import Data from './licenses.json';
import { capitalize, useDarkMode } from '../../utils';

/**
 * @namespace Licenses
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * Download this lib: https://www.npmjs.com/package/npm-license-crawler
 * I did it globally: `npm i npm-license-crawler -g`
 * Run this command to get the data
 * `npm-license-crawler --onlyDirectDependencies --json src/SettingsStack/Licenser/licenses.json`
 */

/**
 * @function extractNameFromGithubUrl
 * @memberof Licenses
 * @description Takes a url to a gitHub repository and returns the username of
 * the author of the software.
 * Created 12/17/20
 * @param {string} url The GitHub url of a piece of software.
 * @returns {string} The GitHub username
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @version 1.0.2
 * @since 1/10/23
 */
function extractNameFromGithubUrl(url) {
  if (!url) {
    return null;
  }

  const reg =
    /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_-]{1,30})(\/([-a-z]{1,40}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
}

/**
 * @function sortDataByKey
 * @memberof Licenses
 * @description Sorts the licenses data by key.
 * Created 12/17/20
 * @param {Object[]} data The list of licenses.
 * @param {string|number} key An object key inside each member of data.
 * @returns {Object[]} A sorted version of the data array that is passed in.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.0.1
 */
function sortDataByKey(data, key) {
  data.sort(function (a, b) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return data;
}

let licenseData = Object.keys(Data).map((key) => {
  let { licenses, ...license } = Data[key];

  let name, version;
  if (key[0] == '@') {
    [, name, version] = key.split('@');
  } else {
    [name, version] = key.split('@');
  }

  let username =
    extractNameFromGithubUrl(license.repository) ||
    extractNameFromGithubUrl(license.licenseUrl);

  let userUrl;
  let image;
  if (username) {
    username = capitalize(username);
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortDataByKey(licenseData, 'username');

/**
 * @function Licenses
 * @component
 * @description A wrapper for the LicensesList component that processes the
 * data and passes it in.
 * Created 12/17/20
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.0.2
 *
 * @example
 * <Licenses />
 */
export default function Licenses() {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray2Light,
    },
  });
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <LicensesList licenses={licenseData} />
    </SafeAreaView>
  );
}
