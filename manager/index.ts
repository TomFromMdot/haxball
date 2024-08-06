import 'dotenv/config';

import express from 'express';
import Docker from 'dockerode';

const app = express();

const port = 6000;

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.listen(port, () => console.log(`Server started http://localhost:${port}`));

app.get('/room-container/create', async (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });
  res.on('close', () => res.end());

  res.write(`Request recived... \n`);

  const roomConfig = JSON.parse(req.query.roomConfig as string);

  if (!roomConfig?.container?.name) return;

  const containerName = roomConfig.container.name;

  const auth = {
    username: process.env.DOCKER_HUB_NAME,
    password: process.env.DOCKER_HUB_TOKEN,
  };

  res.write(`Pull image...`);
  const pullStream = await docker.pull(`${process.env.DOCKER_HUB_NAME}/${process.env.DOCKER_HUB_REPO}:latest`, { authconfig: auth });
  await new Promise((res) => docker.modem.followProgress(pullStream, res));

  try {
    const containerInfo = await docker.getContainer(containerName).inspect();
    const containerStatus = containerInfo.State.Status;

    res.write(`Current container status: [${containerStatus}]`);

    if (containerStatus === 'running') {
      await docker.getContainer(containerName).stop();

      res.write(`Container was stopped...`);
    }

    await docker.getContainer(containerName).remove();

    res.write(`Container was removed...`);
  } catch (err) {
    res.write(`Conteiner does not exist...`);
  }

  try {
    res.write('Start container...');

    const container = await docker.createContainer({
      Image: `${process.env.DOCKER_HUB_NAME}/${process.env.DOCKER_HUB_REPO}:latest`,
      name: containerName,
      Env: [`APP_CONFIG=${JSON.stringify(roomConfig)}`],
      AttachStdout: true,
      AttachStderr: true,
      HostConfig: {
        NetworkMode: 'host',
      },
    });

    container.attach({ stream: true, stdout: true, stderr: true }, async (err, stream) => {
      stream?.on('data', (chunk) => res.write(chunk.toString()));
    });

    await container.start();

    res.write('Container was started...\nLogs [LIVE]:');

    console.log('Container was started...');
  } catch (err) {
    console.log(err);
  }
});
