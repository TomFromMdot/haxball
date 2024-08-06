import argsParser from 'args-parser';
import fetch from 'node-fetch';
//npx tsx room-manager.ts --configFile="RS_NORMAL.ts"

(async () => {
  const args = argsParser(process.argv);

  const configFile = args.configFile;

  if (!configFile) {
    return console.log('Missing param --configFile');
  }

  const configModule = await import(`./configs/${configFile}`);

  let config = configModule.default;
  if (config.source.id !== 'VOLLEY') config.room.public = true;

  const roomConfigString = JSON.stringify(config);

  const headers = {
    Accept: 'text/event-stream',
  };

  const url = `http://${config.container.host}:6000/room-container/create?roomConfig=${roomConfigString}`;

  fetch(url, {})
    .then((response) => response.body)
    //@ts-ignore
    .then((res) =>
      res?.on('readable', () => {
        let chunk: string | Buffer;
        //@ts-ignore
        while (null !== (chunk = res.read())) {
          console.log(`${chunk.toString()} \n`);
        }
      })
    )
    .catch((err) => console.log(err));
})();
