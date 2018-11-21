import * as R from 'ramda';

export const isInRange = (x, range) => x >= range[0] && x <= range[1];

export const isValidRange = (start, end, range = [0, 24]) =>
  isInRange(start, range) && isInRange(end, range);

export const allNumbers = R.all(R.is(Number));
