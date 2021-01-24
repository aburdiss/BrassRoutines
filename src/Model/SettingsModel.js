import DeviceInfo from 'react-native-device-info';

const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/developer?id=Alexander+Burdiss';
const APPLE_STORE_LINK =
  'https://apps.apple.com/us/developer/alexander-burdiss/id1496727055';

export const INSTRUMENT = [
  {
    id: 'A',
    type: 'picker',
    setting: 'instrument',
  },
  {
    id: 'B',
    type: 'segmentedFilter',
    setting: 'bassClef',
  },
];

export const ROUTINE = [
  {
    id: '8',
    type: 'segmentedFilter',
    setting: 'routineLength',
  },
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
    value: 'Articulation',
    setting: 'articulation',
  },
  {
    id: '4',
    type: 'switch',
    value: 'Coordination',
    setting: 'coordination',
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
  {
    id: '7.5',
    type: 'button',
    value: 'Restore Defaults',
    icon: 'refresh',
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
  {
    id: '13AHorn',
    type: 'link',
    instrument: 'horn',
    value: 'Visit Do i need a mute?',
    link: 'https://doineedamute.com/horn',
  },
  {
    id: '13ATrumpet',
    type: 'link',
    instrument: 'trumpet',
    value: 'Visit Do i need a mute?',
    link: 'https://doineedamute.com/trumpet',
  },
  {
    id: '13ATrombone',
    type: 'link',
    instrument: 'trombone',
    value: 'Visit Do i need a mute?',
    link: 'https://doineedamute.com/trombone',
  },
  {
    id: '13ATuba',
    type: 'link',
    instrument: 'tuba',
    value: 'Visit Do i need a mute?',
    link: 'https://doineedamute.com/tuba',
  },
  {
    id: '13B',
    type: 'link',
    instrument: 'trombone',
    value: 'Visit TromboneTools',
    link: 'https://trombonetools.com/',
  },
  {
    id: '13C',
    type: 'link',
    instrument: 'trombone',
    value: 'Visit Trombone Excerpts',
    link: 'http://www.tromboneexcerpts.org/',
  },
  {
    id: '13D',
    type: 'link',
    instrument: 'horn',
    value: 'Visit Horn Excerpts',
    link: 'https://www.hornsociety.org/hornexcerpts-org',
  },
  {
    id: '13E',
    type: 'link',
    instrument: 'trumpet',
    value: 'Visit Trumpet Excerpts',
    link: 'https://www.trumpetexcerpts.org/',
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
