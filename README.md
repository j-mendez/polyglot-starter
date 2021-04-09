# taco-challenge

taco rocket coding challenge - creating the best tacos

## Getting Started

You can start the application locally or using docker. The simplest option to get started is using docker and compose.

### Docker

make sure to have [docker](https://docs.docker.com/get-docker) and [compose](https://docs.docker.com/compose/install) installed. The docker image is using a slim alpine build. On intial container start, its safe to ignore `/usr/lib/libstdc++.so.6` on the alpine image.

1. `docker-compose up`

### Local

Make sure to have deno installed. If your using mac you can use `brew install deno`. If your starting the application locally make sure to have [mongodb](https://www.mongodb.com) running for database operations.

1. `deno run --allow-read --allow-env --allow-net src/main.ts`

## Env

Environmental variables are handled through .env files, example usage below.

```
PORT=8000
```

## Deploying

## About

This apps main goal is for CRUD, architecture, and security. Since security is a core focus for the application we are using [Deno](https://github.com/denoland) for the backend along with [oak](https://oakserver.github.io/oak/) as a middleware framework ("express like"). 



