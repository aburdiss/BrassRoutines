import { useEffect, useContext } from 'react';
import IdleTimerManager from 'react-native-idle-timer';

import { PreferencesContext } from '../../Model/Preferences';

/**
 * @namespace useIdleScreen
 */

/**
 * @function useIdleScreen
 * @memberof useIdleScreen
 * @description Handles keeping a screen on if the user has the preference set
 * in the app settings.
 * Created 7/9/21
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.0.1
 */
export function useIdleScreen() {
  const { state } = useContext(PreferencesContext);

  useEffect(
    /**
     * @function setupIdleScreenPreferences
     * @memberof useIdleScreen
     * @description Turns the screen timer off or on, depending on what the user
     * has selected in preferences. If the user has no preference set, this will
     * default to false, not adjusting the screen timer settings.
     * @returns {Function} A function to reset this screen settings if the idle
     * timer was disabled when navigating here.
     *
     * @author Alexander Burdiss
     * @since 7/6/21
     * @version 1.0.0
     */
    function setupIdleScreenPreferences() {
      if (state?.disableScreenSleep) {
        IdleTimerManager.setIdleTimerDisabled(true);
      } else {
        IdleTimerManager.setIdleTimerDisabled(false);
      }

      return function cleanup() {
        IdleTimerManager.setIdleTimerDisabled(false);
      };
    },
    [state?.disableScreenSleep],
  );
}
