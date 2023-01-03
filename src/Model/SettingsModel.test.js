import 'react-native';
import React from 'react';

const fetch = require('node-fetch');
const https = require('https');
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

import {
  INSTRUMENT,
  ROUTINE,
  FAVORITES,
  CUSTOM_ROUTINES,
  RESOURCES,
  ABOUT,
} from './SettingsModel';

(function checkIfAllIDsAreUnique() {
  let allSettingsItems = [
    ...INSTRUMENT,
    ...ROUTINE,
    ...FAVORITES,
    ...CUSTOM_ROUTINES,
    ...RESOURCES,
    ...ABOUT,
  ];
  let IDs = [];
  let duplicatedItem = false;

  for (let item of allSettingsItems) {
    if (IDs.includes(item.id)) {
      duplicatedItem = item.id;
      break;
    } else {
      IDs.push(item.id);
    }
  }
  expect(duplicatedItem).not.toBeTruthy();
})();

describe.skip('resource links', () => {
  RESOURCES.map(async (resource) => {
    if (!['13C'].includes(resource.id)) {
      test(resource.value, async () => {
        if (resource.type == 'link' && resource.link.startsWith('http')) {
          const resp = await fetch(resource.link, {
            method: 'GET',
            agent: httpsAgent,
          });
          expect(resp.status).toEqual(200);
        }
      });
    }
  });
});

describe.skip('about links', () => {
  ABOUT.map(async (about) => {
    test(about.value, async () => {
      if (about.type == 'link' && about.link.startsWith('http')) {
        const resp = await fetch(about.link, {
          method: 'GET',
          agent: httpsAgent,
        });
        expect(resp.status).toEqual(200);
      }
    });
  });
});
