import { welcome } from '../functions';

test('returns object', () => {
  expect(welcome()).toMatchObject({ message: 'Welcome!' });
});
