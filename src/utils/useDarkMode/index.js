import { useColorScheme } from 'react-native';

/**
 * @function useDarkMode
 * @description A hook that determines whether or not the user is using dark
 * mode on their device or not.
 * Created 8/26/22
 * @returns {boolean} An up to date state variable whether or not the user is
 * using dark mode
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.0.0
 */
export function useDarkMode() {
  const colorTheme = useColorScheme();
  return colorTheme === 'dark';
}
