import React, { useCallback, useState } from 'react';
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
 * @namespace ScalePractice
 */

/**
 * @function ScalePractice
 * @memberof ScalePractice
 * @component
 * @description A View that allows the user to randomize all of the scales in
 * a particular category.
 * Created 10/10/20
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.1.1
 *
 * @example
 * <ScalePractice />
 */
export default function ScalePractice() {
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

  const [currentScale, setCurrentScale] = useState(
    translate('No Scale Selected'),
  );

  const [majorSwitch, setMajorSwitch] = useState(true);
  const toggleMajorSwitch = () =>
    setMajorSwitch((previousState) => !previousState);

  const [naturalMinorSwitch, setNaturalMinorSwitch] = useState(false);
  const toggleNaturalMinorSwitch = () =>
    setNaturalMinorSwitch((previousState) => !previousState);

  const [harmonicMinorSwitch, setHarmonicMinorSwitch] = useState(false);
  const toggleHarmonicMinorSwitch = () =>
    setHarmonicMinorSwitch((previousState) => !previousState);

  const [melodicMinorSwitch, setMelodicMinorSwitch] = useState(false);
  const toggleMelodicMinorSwitch = () =>
    setMelodicMinorSwitch((previousState) => !previousState);

  const [majorModesSwitch, setMajorModesSwitch] = useState(false);
  const toggleMajorModesSwitch = () =>
    setMajorModesSwitch((previousState) => !previousState);

  const [melodicMinorModesSwitch, setMelodicMinorModesSwitch] = useState(false);
  const toggleMelodicMinorModesSwitch = () =>
    setMelodicMinorModesSwitch((previousState) => !previousState);

  const [bluesSwitch, setBluesSwitch] = useState(false);
  const toggleBluesSwitch = () =>
    setBluesSwitch((previousState) => !previousState);

  const [pentatonicSwitch, setPentatonicSwitch] = useState(false);
  const togglePentatonicSwitch = () =>
    setPentatonicSwitch((previousState) => !previousState);

  const [octatonicSwtich, setOctatonicSwitch] = useState(false);
  const toggleOctatonicSwitch = () =>
    setOctatonicSwitch((previousState) => !previousState);

  const [wholeToneSwitch, setWholeToneSwitch] = useState(false);
  const toggleWholeToneSwitch = () =>
    setWholeToneSwitch((previousState) => !previousState);

  /**
   * @function selectAllScales
   * @memberof ScalePractice
   * @description A function that toggles all scale switches to true. If all are
   * currently selected, toggles all off except major.
   * Created 10/12/20
   *
   * @author Alexander Burdiss
   * @since 10/12/20
   * @version 1.0.1
   */
  function selectAllScales() {
    let allOn = true;

    if (!majorSwitch) {
      allOn = false;
      setMajorSwitch(true);
    }
    if (!naturalMinorSwitch) {
      allOn = false;
      setNaturalMinorSwitch(true);
    }
    if (!harmonicMinorSwitch) {
      allOn = false;
      setHarmonicMinorSwitch(true);
    }
    if (!melodicMinorSwitch) {
      allOn = false;
      setMelodicMinorSwitch(true);
    }
    if (!majorModesSwitch) {
      allOn = false;
      setMajorModesSwitch(true);
    }
    if (!melodicMinorModesSwitch) {
      allOn = false;
      setMelodicMinorModesSwitch(true);
    }
    if (!bluesSwitch) {
      allOn = false;
      setBluesSwitch(true);
    }
    if (!pentatonicSwitch) {
      allOn = false;
      setPentatonicSwitch(true);
    }
    if (!octatonicSwtich) {
      allOn = false;
      setOctatonicSwitch(true);
    }
    if (!wholeToneSwitch) {
      allOn = false;
      setWholeToneSwitch(true);
    }

    if (allOn) {
      setNaturalMinorSwitch(false);
      setHarmonicMinorSwitch(false);
      setMelodicMinorSwitch(false);
      setMajorModesSwitch(false);
      setMelodicMinorModesSwitch(false);
      setBluesSwitch(false);
      setPentatonicSwitch(false);
      setOctatonicSwitch(false);
      setWholeToneSwitch(false);
    }
  }

  /**
   * @function generateScales
   * @memberof ScalePractice
   * @description A function that parses what switches are turned on, and
   * generates a random scale based on the user preferences.
   * Created 10/11/20
   *
   * @author Alexander Burdiss
   * @since 10/11/20
   * @version 1.0.1
   */
  function generateScales() {
    const majorLetterNames = [
      'C',
      'D♭',
      'D',
      'E♭',
      'E',
      'F',
      'F♯',
      'G♭',
      'G',
      'A♭',
      'A',
      'B♭',
      'B',
    ];
    const minorLetterNames = [
      'C',
      'C♯',
      'D',
      'D♯',
      'E♭',
      'E',
      'F',
      'F♯',
      'G',
      'G♯',
      'A',
      'B♭',
      'B',
    ];
    const indeterminantLetterNames = [
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

    const pentatonicScaleNames = ['Major Pentatonic', 'Minor Pentatonic'];
    const majorModeNames = [
      'Ionian',
      'Dorian',
      'Phrygian',
      'Lydian',
      'Mixolydian',
      'Aeolian',
      'Locrian',
    ];
    const melodicMinorModeNames = [
      'Minor Major',
      'Dorian ♭2',
      'Lydian Augmented',
      'Lydian Dominant',
      'Mixolydian ♭6',
      'Locrian ♮2',
      'Altered Scale',
    ];
    const octatonicScaleNames = [
      'Whole-Half Octatonic',
      'Half-Whole Octatonic',
    ];

    let possibleScales = [];

    if (majorSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(majorLetterNames, ['Major']),
      );
    }
    if (naturalMinorSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(minorLetterNames, ['Natural Minor']),
      );
    }
    if (harmonicMinorSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(minorLetterNames, ['Harmonic Minor']),
      );
    }
    if (melodicMinorSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(minorLetterNames, ['Melodic Minor']),
      );
    }
    if (majorModesSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(majorLetterNames, majorModeNames),
      );
    }
    if (melodicMinorModesSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(minorLetterNames, melodicMinorModeNames),
      );
    }
    if (bluesSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(indeterminantLetterNames, ['Blues']),
      );
    }
    if (pentatonicSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(
          indeterminantLetterNames,
          pentatonicScaleNames,
        ),
      );
    }
    if (octatonicSwtich) {
      possibleScales.push(
        ...createScaleArrayFromParts(
          indeterminantLetterNames,
          octatonicScaleNames,
        ),
      );
    }
    if (wholeToneSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(indeterminantLetterNames, ['Whole Tone']),
      );
    }

    // Ensuring that the new scale is different from the old one
    if (possibleScales.length === 0) {
      Alert.alert(
        translate('No Scale Selected'),
        translate('Please select at least one category'),
      );
    } else {
      let newScale;
      do {
        newScale = possibleScales[random(possibleScales.length - 1)];
      } while (newScale == currentScale);
      setCurrentScale(newScale ? newScale : translate('No Scale Selected'));
    }
  }

  /**
   * @function createScaleArrayFromParts
   * @memberof ScalePractice
   * @description Constructs the scale name and scale note together to form one
   * string to display on the screen.
   * Created 10/12/20
   * @param {string[]} letterNames
   * @param {string[]} scaleNames
   * @returns {string[]} array of all transpositions of a scale
   *
   * @author Alexander Burdiss
   * @since 10/12/20
   * @version 1.0.2
   */
  function createScaleArrayFromParts(letterNames, scaleNames) {
    let allLetterNamesOfScale = [];
    for (let letter of letterNames) {
      for (let scaleName of scaleNames) {
        allLetterNamesOfScale.push(`${letter} ${translate(scaleName)}`);
      }
    }
    return allLetterNamesOfScale;
  }

  /**
   * @function debouncedGenerateScales
   * @memberof ScalePractice
   * @description Prevents the user from clicking the generate button within
   * 150 ms of another press.
   * Created 1/5/21
   *
   * @author Alexander Burdiss
   * @since 1/5/21
   * @version 1.0.0
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGenerateScales = useCallback(
    debounce(generateScales, 150, true),
    [
      majorSwitch,
      naturalMinorSwitch,
      harmonicMinorSwitch,
      melodicMinorSwitch,
      majorModesSwitch,
      melodicMinorModesSwitch,
      bluesSwitch,
      pentatonicSwitch,
      octatonicSwtich,
      wholeToneSwitch,
    ],
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.scaleDisplay}>
        <ScaleDisplay accessibilityLiveRegion="assertive">
          {currentScale}
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
            onValueChange={toggleNaturalMinorSwitch}
            value={naturalMinorSwitch}
            text={translate('Natural Minor')}
          />
          <ScaleSwitchRow
            onValueChange={toggleHarmonicMinorSwitch}
            value={harmonicMinorSwitch}
            text={translate('Harmonic Minor')}
          />
          <ScaleSwitchRow
            onValueChange={toggleMelodicMinorSwitch}
            value={melodicMinorSwitch}
            text={translate('Melodic Minor')}
          />
          <ScaleSwitchRow
            onValueChange={toggleMajorModesSwitch}
            value={majorModesSwitch}
            text={translate('Major Modes')}
          />
          <ScaleSwitchRow
            onValueChange={toggleMelodicMinorModesSwitch}
            value={melodicMinorModesSwitch}
            text={translate('Melodic Minor Modes')}
          />
          <ScaleSwitchRow
            onValueChange={toggleBluesSwitch}
            value={bluesSwitch}
            text={translate('Blues')}
          />
          <ScaleSwitchRow
            onValueChange={togglePentatonicSwitch}
            value={pentatonicSwitch}
            text={translate('Pentatonic')}
          />
          <ScaleSwitchRow
            onValueChange={toggleOctatonicSwitch}
            value={octatonicSwtich}
            text={translate('Octatonic')}
          />
          <ScaleSwitchRow
            onValueChange={toggleWholeToneSwitch}
            value={wholeToneSwitch}
            text={translate('Whole Tone')}
          />
          <View style={styles.allScaleButton}>
            <AllScalesButton
              handler={selectAllScales}
              accessibilityHint={translate('Toggles All Scales')}
            >
              {translate('All Scales')}
            </AllScalesButton>
          </View>
        </ScrollView>
      </View>
      <View style={styles.mainActionButton}>
        <MainActionButton
          handler={debouncedGenerateScales}
          accessibilityValue={{ text: `${translate(currentScale)}` }}
          accessibilityHint={translate('Randomizes a new scale')}
          text={'Randomize'}
        />
      </View>
    </SafeAreaView>
  );
}
