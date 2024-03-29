import React, { useState, useCallback } from 'react';
import { Alert, View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScaleDisplay from '../../Components/ScaleDisplay/ScaleDisplay';
import AllScalesButton from '../../Components/AllScalesButton/AllScalesButton';
import MainActionButton from '../../Components/MainActionButton/MainActionButton';
import ScaleSwitchRow from '../../Components/ScaleSwitchRow/ScaleSwitchRow';
import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

import { useDarkMode, useIdleScreen, random, debounce } from '../../utils';

/**
 * @function ArpeggioPractice
 * @component
 * @description A view that allows the user to randomize all of the arpeggios
 * in a particular category.
 * Created 10/10/20
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/3/23
 * @version 1.0.1
 *
 * @example
 * <ArpeggioPractice />
 */
export default function ArpeggioPractice() {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    allScaleButton: {
      paddingHorizontal: 10,
    },
    container: {
      flex: 1,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
    mainActionButton: {
      borderColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
      borderTopWidth: 1,
    },
    scaleDisplay: {
      borderBottomWidth: 1,
      borderColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
    },
    switchesContainer: {
      flex: 1,
      alignSelf: 'center',
      width: '100%',
      marginHorizontal: 10,
    },
  });

  const [currentArpeggio, setCurrentArpeggio] = useState(
    translate('No Arpeggio Selected'),
  );

  const [majorSwitch, setMajorSwitch] = useState(true);
  const toggleMajorSwitch = () =>
    setMajorSwitch((previousState) => !previousState);

  const [minorSwitch, setMinorSwitch] = useState(false);
  const toggleMinorSwitch = () =>
    setMinorSwitch((previousState) => !previousState);

  const [augmentedSwitch, setAugmentedSwitch] = useState(false);
  const toggleAugmentedSwitch = () =>
    setAugmentedSwitch((previousState) => !previousState);

  const [diminishedSwitch, setDiminishedSwitch] = useState(false);
  const toggleDiminishedSwitch = () =>
    setDiminishedSwitch((previousState) => !previousState);

  const [dominantSeventhSwitch, setDominantSeventhSwitch] = useState(false);
  const toggleDominantSeventhSwitch = () =>
    setDominantSeventhSwitch((previousState) => !previousState);

  const [majorSeventhSwitch, setMajorSeventhSwitch] = useState(false);
  const toggleMajorSeventhSwitch = () =>
    setMajorSeventhSwitch((previousState) => !previousState);

  const [minorSeventhSwitch, setMinorSeventhSwitch] = useState(false);
  const toggleMinorSeventhSwitch = () =>
    setMinorSeventhSwitch((previousState) => !previousState);

  const [minorMajorSeventhSwitch, setMinorMajorSeventhSwitch] = useState(false);
  const toggleMinorMajorSeventhSwitch = () =>
    setMinorMajorSeventhSwitch((previousState) => !previousState);

  const [augmentedSeventhSwitch, setAugmentedSeventhSwitch] = useState(false);
  const toggleAugmentedSeventhSwitch = () =>
    setAugmentedSeventhSwitch((previousState) => !previousState);

  const [halfDiminishedSeventhSwitch, setHalfDiminishedSeventhSwitch] =
    useState(false);
  const toggleHalfDiminishedSeventhSwitch = () =>
    setHalfDiminishedSeventhSwitch((previousState) => !previousState);

  const [diminishedSeventhSwitch, setDiminishedSeventhSwitch] = useState(false);
  const toggleDiminishedSeventhSwitch = () =>
    setDiminishedSeventhSwitch((previousState) => !previousState);

  /**
   * @function ArpeggioPractice~selectAllArpeggios
   * @description A function that toggles all arpeggio switches to true. If all
   * are currently selected, toggles all off except major.
   * @author Alexander Burdiss
   * @since 10/14/20
   * @version 1.0.1
   */
  function selectAllArpeggios() {
    let allOn = true;

    if (!majorSwitch) {
      allOn = false;
      setMajorSwitch(true);
    }

    if (!minorSwitch) {
      allOn = false;
      setMinorSwitch(true);
    }

    if (!augmentedSwitch) {
      allOn = false;
      setAugmentedSwitch(true);
    }

    if (!diminishedSwitch) {
      allOn = false;
      setDiminishedSwitch(true);
    }

    if (!dominantSeventhSwitch) {
      allOn = false;
      setDominantSeventhSwitch(true);
    }

    if (!majorSeventhSwitch) {
      allOn = false;
      setMajorSeventhSwitch(true);
    }

    if (!minorSeventhSwitch) {
      allOn = false;
      setMinorSeventhSwitch(true);
    }

    if (!minorMajorSeventhSwitch) {
      allOn = false;
      setMinorMajorSeventhSwitch(true);
    }

    if (!augmentedSeventhSwitch) {
      allOn = false;
      setAugmentedSeventhSwitch(true);
    }

    if (!halfDiminishedSeventhSwitch) {
      allOn = false;
      setHalfDiminishedSeventhSwitch(true);
    }

    if (!diminishedSeventhSwitch) {
      allOn = false;
      setDiminishedSeventhSwitch(true);
    }

    if (allOn) {
      setMinorSwitch(false);
      setAugmentedSwitch(false);
      setDiminishedSwitch(false);
      setDominantSeventhSwitch(false);
      setMajorSeventhSwitch(false);
      setMinorSeventhSwitch(false);
      setMinorMajorSeventhSwitch(false);
      setAugmentedSeventhSwitch(false);
      setHalfDiminishedSeventhSwitch(false);
      setDiminishedSeventhSwitch(false);
    }
  }

  /**
   * @function ArpeggioPractice~generateArpeggios
   * @description A function that parses what switches are turned on, and
   * generates a random arpeggio based on the user preferences.
   * @author Alexander Burdiss
   * @since 10/13/20
   * @version 1.0.1
   */
  function generateArpeggios() {
    let possibleArpeggios = [];

    if (majorSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Major'));
    }
    if (minorSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Minor'));
    }
    if (augmentedSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Augmented'));
    }
    if (diminishedSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Diminished'));
    }
    if (dominantSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Dominant Seventh'),
      );
    }
    if (majorSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Major Seventh'));
    }
    if (minorSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Minor Seventh'));
    }
    if (minorMajorSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Minor Major Seventh'),
      );
    }
    if (augmentedSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Augmented Minor Seventh'),
      );
    }
    if (halfDiminishedSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Half Diminished Seventh'),
      );
    }
    if (diminishedSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Diminished Seventh'),
      );
    }

    // Ensuring that the new arpeggio is different from the old one.
    if (possibleArpeggios.length === 0) {
      Alert.alert(
        translate('No Arpeggio Selected'),
        translate('Please select at least one category'),
      );
    } else {
      let newArpeggio;
      do {
        newArpeggio = possibleArpeggios[random(possibleArpeggios.length - 1)];
      } while (newArpeggio === currentArpeggio);
      setCurrentArpeggio(
        newArpeggio ? newArpeggio : translate('No Arpeggio Selected'),
      );
    }
  }

  /**
   * @function ArpeggioPractice~createArpeggioArrayFromParts
   * @description Constructs the arpeggio name and arpeggio note together to
   * form one string to display on the screen.
   * @author Alexander Burdiss
   * @since 10/12/20
   * @version 1.0.2
   *
   * @returns {[String]} array of all transpositions of a scale
   */
  function createArpeggioArrayFromParts(scaleName) {
    const letterNames = [
      'C',
      'C♯',
      'D',
      'E♭',
      'E',
      'F',
      'F♯',
      'G',
      'A♭',
      'A',
      'B♭',
      'B',
    ];

    let allLetterNamesOfScale = [];
    for (let letter of letterNames) {
      allLetterNamesOfScale.push(`${letter} ${translate(scaleName)}`);
    }
    return allLetterNamesOfScale;
  }

  /**
   * @function ArpeggioPractice~debouncedGenerateArpeggios
   * @description Prevents the user from clicking the generate button within
   * 150 ms of another click.
   * @author Alexander Burdiss
   * @since 1/13/21
   * @version 1.0.0
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGenerateArpeggios = useCallback(
    debounce(generateArpeggios, 150, true),
    [
      majorSwitch,
      minorSwitch,
      augmentedSwitch,
      diminishedSwitch,
      dominantSeventhSwitch,
      majorSeventhSwitch,
      minorSeventhSwitch,
      minorMajorSeventhSwitch,
      augmentedSeventhSwitch,
      halfDiminishedSeventhSwitch,
      diminishedSeventhSwitch,
    ],
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.scaleDisplay}>
        <ScaleDisplay accessibilityLiveRegion="assertive">
          {currentArpeggio}
        </ScaleDisplay>
      </View>
      <View style={styles.switchesContainer}>
        <ScrollView>
          <ScaleSwitchRow
            onValueChange={toggleMajorSwitch}
            value={majorSwitch}
            text={translate('Major')}
          />
          <ScaleSwitchRow
            onValueChange={toggleMinorSwitch}
            value={minorSwitch}
            text={translate('Minor')}
          />
          <ScaleSwitchRow
            onValueChange={toggleAugmentedSwitch}
            value={augmentedSwitch}
            text={translate('Augmented')}
          />
          <ScaleSwitchRow
            onValueChange={toggleDiminishedSwitch}
            value={diminishedSwitch}
            text={translate('Diminished')}
          />
          <ScaleSwitchRow
            onValueChange={toggleDominantSeventhSwitch}
            value={dominantSeventhSwitch}
            text={translate('Dominant Seventh')}
          />
          <ScaleSwitchRow
            onValueChange={toggleMajorSeventhSwitch}
            value={majorSeventhSwitch}
            text={translate('Major Seventh')}
          />
          <ScaleSwitchRow
            onValueChange={toggleMinorSeventhSwitch}
            value={minorSeventhSwitch}
            text={translate('Minor Seventh')}
          />
          <ScaleSwitchRow
            onValueChange={toggleMinorMajorSeventhSwitch}
            value={minorMajorSeventhSwitch}
            text={translate('Minor Major Seventh')}
          />
          <ScaleSwitchRow
            onValueChange={toggleAugmentedSeventhSwitch}
            value={augmentedSeventhSwitch}
            text={translate('Augmented Minor Seventh')}
          />
          <ScaleSwitchRow
            onValueChange={toggleHalfDiminishedSeventhSwitch}
            value={halfDiminishedSeventhSwitch}
            text={translate('Half Diminished Seventh')}
          />
          <ScaleSwitchRow
            onValueChange={toggleDiminishedSeventhSwitch}
            value={diminishedSeventhSwitch}
            text={translate('Diminished Seventh')}
          />
          <View style={styles.allScaleButton}>
            <AllScalesButton
              handler={selectAllArpeggios}
              accessibilityHint={translate('Toggles All Arpeggios')}
            >
              {translate('All Arpeggios')}
            </AllScalesButton>
          </View>
        </ScrollView>
      </View>
      <View style={styles.mainActionButton}>
        <MainActionButton
          handler={debouncedGenerateArpeggios}
          accessibilityValue={{ text: `${translate(currentArpeggio)}` }}
          accessibilityHint={translate('Randomizes a new arpeggio')}
          text={'Randomize'}
        />
      </View>
    </SafeAreaView>
  );
}
