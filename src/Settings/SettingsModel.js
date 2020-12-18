import DeviceInfo from 'react-native-device-info';
import {colors} from '../Model/Model';

export const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/developer?id=Alexander+Burdiss';
export const APPLE_STORE_LINK =
  'https://apps.apple.com/us/developer/alexander-burdiss/id1496727055';

export const INSTRUMENT = [
  {
    id: 'A',
    type: 'picker',
    values: [
      {label: 'Horn', value: 'horn', color: colors.orangeLight},
      {label: 'Trumpet', value: 'trumpet', color: colors.orangeLight},
      {label: 'Trombone', value: 'trombone', color: colors.orangeLight},
      {label: 'Euphonium', value: 'euphonium', color: colors.orangeLight},
      {label: 'Tuba', value: 'tuba', color: colors.orangeLight},
    ],
    setting: 'instrument',
  },
];

export const FUNDAMENTALS = [
  {
    id: '0',
    type: 'switch',
    value: 'Long Tones',
    setting: 'longTones',
  },
  {
    id: '1',
    type: 'switch',
    value: 'Slow Lip Slurs',
    setting: 'slowLipSlurs',
  },
  {
    id: '2',
    type: 'switch',
    value: 'Fast Lip Slurs',
    setting: 'fastLipSlurs',
  },
  {
    id: '3',
    type: 'switch',
    value: 'Single Note Articulation',
    setting: 'singleNoteArticulation',
  },
  {
    id: '4',
    type: 'switch',
    value: 'Changing Note Articulation',
    setting: 'changingNoteArticulation',
  },
  {
    id: '5',
    type: 'switch',
    value: 'Major Scales',
    setting: 'majorScales',
  },
  {
    id: '6',
    type: 'switch',
    value: 'High Range',
    setting: 'highRange',
  },
  {
    id: '7',
    type: 'switch',
    value: 'Low Range',
    setting: 'lowRange',
  },
];

export const ROUTINE_LENGTH = [
  {
    id: '8',
    type: 'segmentedFilter',
    choices: ['Short', 'Medium', 'Long'],
    setting: 'routineLength',
  },
];

export const FAVORITES = [
  {
    id: '9',
    type: 'button',
    value: 'Reset Favorites',
    icon: 'heart-dislike-outline',
  },
];

export const CUSTOM_ROUTINES = [
  {
    id: '10',
    type: 'button',
    value: 'Reset Custom Routines',
    icon: 'trash-outline',
  },
];

export const RESOURCES = [
  {
    id: '11',
    type: 'link',
    value: 'More Apps by Alexander Burdiss',
    link:
      DeviceInfo.getBrand() === 'Apple' ? APPLE_STORE_LINK : GOOGLE_PLAY_LINK,
  },
  {
    id: '12',
    type: 'link',
    value: 'Visit Ars Nova Publishing',
    link: 'https://www.arsnovapublishing.com/',
  },
  {
    id: '13',
    type: 'link',
    value: 'Visit Band Room Online',
    link: 'https://www.bandroomonline.com/',
  },
];

export const ABOUT = [
  {
    id: '14',
    type: 'text',
    value: `© ${new Date().getFullYear()} ` + 'Alexander Burdiss',
  },
  {
    id: '15',
    type: 'navigate',
    value: 'Licenses',
    component: 'Licenses',
  },
  {
    id: '16',
    type: 'link',
    value: 'Send Feedback',
    link: 'mailto:aburdiss@icloud.com',
  },
];
