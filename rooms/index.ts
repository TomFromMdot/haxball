import 'dotenv/config';

import Room from 'core/Room';

let currentConfig = {};

//DEVELOPMENT
if (process.env.NODE_ENV != 'production') {
  const configName = process.argv[2];

  if (!configName) {
    console.error('Pass room config e.g npx tsx . RS_1');

    process.exit();
  }

  const config = (await import(`./configs/${configName}.ts`)).default;

  currentConfig = config;
  process.env.APP_CONFIG = JSON.stringify(config);
}

//PRODUCTION
else if (process.env.NODE_ENV == 'production') {
  currentConfig = JSON.parse(process.env.APP_CONFIG || null);
}

const roomInstance = new Room(currentConfig);

const { room, store, config } = await roomInstance.create();

roomInstance.hydrate();

export { room, store, config };
