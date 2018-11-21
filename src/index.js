import { NODE_ENV } from './Helpers/ENV/NODE_ENV';
import { logger } from './Helpers/Logger/functions';

import { initApp } from './app';

process.on('uncaughtException', error =>
  logger.error('uncaughtException', error));

export const startApp = async () =>
  logger.info(`App started. Environment: ${NODE_ENV}.`);

export const gracefulExit = (...args) => {
  logger.error(...args);
  setTimeout(() => process.exit(1), 500);
};

(() => startApp().then(initApp).catch(gracefulExit))();
