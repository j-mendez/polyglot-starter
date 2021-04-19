# deno-rest-starter

[![j-mendez](https://circleci.com/gh/j-mendez/deno-rest-starter.svg?style=svg)](https://circleci.com/gh/j-mendez/deno-rest-starter)

a production ready deno starter focused on making tacos. Setup with redis, mongodb, and meilisearch model syncing.

## Getting Started

You can start the application locally or using docker. The simplest option to get started is using docker and compose.

### Docker

make sure to have [docker](https://docs.docker.com/get-docker) and [compose](https://docs.docker.com/compose/install) installed. The docker image is using a slim alpine build. On intial container start, its safe to ignore the log output /usr/lib/libstdc++.so.6 on the alpine image.

1. `docker-compose up`

### Local

Make sure to have deno installed. If your using mac you can use `brew install deno`. If your starting the application locally make sure to have [mongodb](https://www.mongodb.com) running for database operations. You need to add a `.env` file and add `DB_URL=$URL_DB_URL`, replace `$URL_DB_URL` with your database endpoint.

1. `deno run --allow-read --allow-env --allow-net main.ts`

## Pages

Pages are views that are server side rendered to html.

| url                  | dynamic   | models                                                                                 | description                                                                                                     |
| -------------------- | --------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| /pages/orders        | no        | Orders                                                                                 | Get a list of recent orders from redis                                                                          |

## Validation

REST validation is done through [validator-middleware](middlewares/validator.ts). 

## Middlewares

below are a list of custom middlewares in registration order.

1. [rate-limiting](middlewares/rate-limiting.ts)
2. [body-parser](middlewares/body-parser.ts)
3. [errors](middlewares/errors.ts#L8)
4. [validator](middlewares/validator.ts)
4. [404](middlewares/errors.ts#L3)

## Databases

Below are a list of databases used. Mongodb is one of the databases used in the application. If your using docker and need an admin tool navigate to `localhost:8081`. We use [meilisearch](https://github.com/meilisearch/MeiliSearch) for the search server.

1. [redis](databases/redis.ts)
2. [mongo](databases/mongodb.ts)
3. [meilisearch](databases/meilisearch.ts)

## Testing

The app is setup with assertion testing that handles redirection to valid responses for a rest api. When building new features handle the validation through assertions inside the file.

### Benchmarks

The benchmarks are located in the [benchmarks](/benchmarks) directory. On each suite the rate limiting middleware is disabled. Please do not run in production since this will adjust the runtime of your server. Read [benchmarks-docs](BENCHMARKS.md) for more information on the type of test, how to, average, and etc. 

## Env

Environmental variables are handled through .env files. For an example look at the usage below. Check out [.env.defaults](.env.defaults) to see the full list.

```
PORT=8000
MONGO_DB_PORT=27017
MONGO_DB_NAME=taco-rocket
MONGO_DB_URL=mongodb://mongodb:27017/?compressors=zlib&gssapiServiceName=mongodb
MONGO_DB_RETRY_TIMOUT=15000
REDIS_DB_URL=redis
SYSTEM_ADMIN_PASSWORD=password
```

## Fixtures

To get started with testing the api you can use the `fixtures` inside the project. For more information read [fixtures-doc](FIXTURES.md)

## Deploying

Deployment is done using [ECS](https://console.aws.amazon.com/ecs) for clustering, security groups, load balancing, logging, volumes, and elastic scaling. The docker image used for the api is at [image](https://hub.docker.com/r/jeffmendez19/taco-api)

## About

This apps main goal is for CRUD, architecture, and security. Since security is a core focus for the application we are using [Deno](https://github.com/denoland) for the backend along with [oak](https://oakserver.github.io/oak/) as a middleware framework ("express like"). When you post an order, if the option is not a part of the ingredient list the order will be rejected with output of valid options. The ingredient list is in memory using `enum`. If we want to add the ability to add to the ingredients list we can either mutate the enum at runtime or use the database with a `seed` step to generate the intial ingredients based off the enums. For now neither was done and the option to add a new ingredient is set by bypassing the available options through the `customIngredients` property in the order item. For an example checkout [custom-order-fixture](./fixtures/post-custom-order.sh). Rate limiting is added as a security feature to protect against DDOS. The current rate is set to 2 request per 3 seconds, to adjust the middleware go to [Rate Limiting](./middlewares/rate-limiting.ts).