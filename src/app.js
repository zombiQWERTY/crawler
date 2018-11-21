import * as R from 'ramda';

import { logger } from './Helpers/Logger/functions';
import { performSearchUrl, getUserData, search } from './Modules/Crawler/functions';
import { getSettings } from './settings';

export const initApp = async () => {
  const settings = getSettings();

  const searchURI = performSearchUrl({
    locations: settings.get('locations'),
    repos: settings.get('repos'),
    language: settings.get('language'),
    type: settings.get('type')
  });

  const selector = settings.get('selector');

  const $ = await search(searchURI);

  const usersMarkup = $('.user-list-info');
  const userNames = Object.values(usersMarkup)
    .map(user => $(user).find($('a:first-child')).attr('href'))
    .filter(value => value);

  const users = await Promise.all(userNames.map(getUserData));
  console.log(users);

  logger.info(R.pick([selector], users));
};
