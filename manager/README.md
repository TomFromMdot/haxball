# Room Manager

## Overview

This documentation provides information about the Room Manager, a component responsible for managing HaxBall game rooms through Docker containers. The Room Manager handles the creation of Docker containers hosting HaxBall rooms based on the provided room configuration.

![Manager diagram](https://media.discordapp.net/attachments/1159211106087215204/1208556007114932284/manager.png?ex=65e3b67d&is=65d1417d&hm=d12d25416839342bde2ba4683b0baac3a2be7713b1cee669a685422d5f44d603&=&format=webp&quality=lossless&width=1826&height=888)

### Environment Variables

Ensure you have the following environment variables set in your `.env` file:

- `DOCKER_HUB_TOKEN`
- `DOCKER_HUB_NAME`
- `DOCKER_HUB_REPO`

These variables are equivalent to the secrets `DOCKER_HUB_USER` and `DOCKER_HUB_TOKEN` used in GitHub Actions.

### Room Configuration Endpoint

The Room Manager exposes an endpoint (`/room-container/create`) that receives a request with the room configuration.

### Room Configuration Request Flow

1. The room project sends a request to the `/room-container/create` endpoint with the room configuration as a query parameter.

2. The Room Manager processes the request and parses the room configuration.

3. The Docker container for the specified room is pulled from the Docker Hub registry, using the provided authentication credentials.

4. The existing container for the specified room is inspected, and its status is checked.

5. If the container is running, it is stopped and then removed. If it doesn't exist, the Room Manager proceeds without stopping or removing it.

6. A new Docker container is created for the specified room, and the HaxBall server is started within the container.

7. The Room Manager provides live logs of the container's activities as it starts.

## GitHub Actions Workflow

The Room Manager is integrated with GitHub Actions to automate the deployment process. The workflow involves pushing the Docker container to the Docker Hub registry and triggering the deployment on the VPS.
