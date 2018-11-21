import request from 'request-promise';
import cheerio from 'cheerio';

const empty = entity => !entity.length;

export const performSearchUrl = ({ locations, repos, language, type }) => {
  const byLocation = empty(locations) ? '' : locations.map(location => `location:${location}`).join(' ');
  const byRepos = empty(repos) ? '' : `repos:${repos}`;
  const byLanguage = empty(language) ? '' : `language:${language}`;
  const byType = empty(type) ? '' : `&type=${type}`;

  const query = [byLocation, byRepos, byLanguage, byType];

  return `https://github.com/search?q=${query.join(' ')}`;
};

export const search = uri => request({ uri, transform });

export const getUserData = async profileURL => {
  const $ = await request({
    uri: `https://github.com/${profileURL}`,
    transform: body => cheerio.load(body)
  });

  const fullName = $('.vcard-fullname').text();
  const username = $('.vcard-username').text();
  const location = $('.vcard-details li[itemprop="homeLocation"] span').text();

  return { fullName, username, location };
};

export const transform = body => cheerio.load(body);
