import { logger } from '../../Helpers/Logger/functions';

/**
 * Welcome test function.
 */
export const welcome = () => {
  const message = { message: 'Welcome!' };
  logger.info(message);
  return message;
};
