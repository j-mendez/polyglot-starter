# taco-challenge

taco rocket coding challenge - creating the best tacos

## Getting Started

You can start the application locally or using docker. The simplest option to get started is using docker and compose.

### Docker

make sure to have [docker](https://docs.docker.com/get-docker) and [compose](https://docs.docker.com/compose/install) installed. The docker image is using a slim alpine build. On intial container start, its safe to ignore the log output /usr/lib/libstdc++.so.6 on the alpine image.

1. `docker-compose up`

### Local

Make sure to have deno installed. If your using mac you can use `brew install deno`. If your starting the application locally make sure to have [mongodb](https://www.mongodb.com) running for database operations.

1. `deno run --allow-read --allow-env --allow-net main.ts`

## Env

Environmental variables are handled through .env files. For an example look at the usage below. Check out [.env.defaults](.env.defaults) to see the full list.

```
PORT=8000
DB_PORT=27017
DB_NAME=taco-rocket
```

## Deploying

Deployment is done using [ECS](https://console.aws.amazon.com/ecs) for clustering, security groups, load balancing, logging, volumes, and elastic scaling. The docker image used for the api is at [image](https://hub.docker.com/r/jeffmendez19/taco-api)

## About

This apps main goal is for CRUD, architecture, and security. Since security is a core focus for the application we are using [Deno](https://github.com/denoland) for the backend along with [oak](https://oakserver.github.io/oak/) as a middleware framework ("express like"). 



