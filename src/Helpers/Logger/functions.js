import * as R from 'ramda';
import log4js from 'log4js';
import { isProduction } from '../ENV/NODE_ENV';

const getLevel = level => isProduction() ? level : 'all';
const getAppenders = appenders => isProduction() ? appenders : R.append('console', appenders);
const createFileAppender = name => ({
  backups: 3,
  type: 'file',
  compress: true,
  maxLogSize: 10485760,
  filename: `./log/${name}.log`
});

// Levels are: ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: createFileAppender('default')
  },
  categories: {
    default: {
      level: getLevel('info'),
      appenders: getAppenders(['file'])
    }
  }
});

export const logger = log4js.getLogger();

