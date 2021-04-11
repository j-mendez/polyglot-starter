# taco-challenge

taco rocket coding challenge - creating the best tacos

## Getting Started

You can start the application locally or using docker. The simplest option to get started is using docker and compose.

### Docker

make sure to have [docker](https://docs.docker.com/get-docker) and [compose](https://docs.docker.com/compose/install) installed. The docker image is using a slim alpine build. On intial container start, its safe to ignore the log output /usr/lib/libstdc++.so.6 on the alpine image.

1. `docker-compose up`

### Local

Make sure to have deno installed. If your using mac you can use `brew install deno`. If your starting the application locally make sure to have [mongodb](https://www.mongodb.com) running for database operations. You need to add a `.env` file and add `DB_URL=$URL_DB_URL`, replace `$URL_DB_URL` with your database endpoint.

1. `deno run --allow-read --allow-env --allow-net main.ts`

## Env

Environmental variables are handled through .env files. For an example look at the usage below. Check out [.env.defaults](.env.defaults) to see the full list.

```
PORT=8000
MONGO_DB_PORT=27017
MONGO_DB_NAME=taco-rocket
MONGO_DB_URL=mongodb://mongodb:27017/?compressors=zlib&gssapiServiceName=mongodb
MONGO_DB_RETRY_TIMOUT=15000
```

## Database

Mongodb is one of the databases used in the application. If your using docker and need an admin tool navigate to `localhost:8081`.

## Examples

To get started with testing the api you can use the `fixtures` in the project as a starting point. In terminal run the scripts below. 

#### POST order
create new order.
```
./fixtures/post-order.sh
```
#### GET orders
retrieve all orders.
```
./fixtures/get-orders.sh
```
#### GET order by id
retrieve a single order by id, replace `$id` with the order id returned on create order.
```
./fixtures/get-order-by-id.sh "$id"
```
#### DELETE order by id
delete a single order by id, replace `$id` with the order id returned on create order.
```
./fixtures/delete-order-by-id.sh "$id"
```

## Deploying

Deployment is done using [ECS](https://console.aws.amazon.com/ecs) for clustering, security groups, load balancing, logging, volumes, and elastic scaling. The docker image used for the api is at [image](https://hub.docker.com/r/jeffmendez19/taco-api)

## About

This apps main goal is for CRUD, architecture, and security. Since security is a core focus for the application we are using [Deno](https://github.com/denoland) for the backend along with [oak](https://oakserver.github.io/oak/) as a middleware framework ("express like"). When you post an order, if the option is not a part of the ingredient list the order will be rejected with output of valid options. The ingredient list is in memory using `enum`. If we want to add the ability to add to the ingredients list we can either mutate the enum at runtime or use the database with a `seed` step to generate the intial ingredients based off the enums. For now neither was done and the option to add a new ingredient is set by bypassing the available options through the `customeIngredients` property in the order item. For an example checkout [custom-order-fixture](./fixtures/post-custom-order.sh)



