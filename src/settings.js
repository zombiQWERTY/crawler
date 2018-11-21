import convict from 'convict';

const config = convict({
  // env: {
  //   doc: 'The application environment.',
  //   format: ['production', 'development', 'test'],
  //   default: 'development',
  //   env: 'NODE_ENV'
  // }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);
config.validate({ allowed: 'strict' });

export const getSettings = () => config;
