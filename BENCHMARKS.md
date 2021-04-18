# benchmarks

All application benchmarks with how to usage. The current benchmarks set data was ran on a 2gb - 6 CPUS docker shared instance across redis, mongo, mongo-express(admin), and a deno alpine build. The set of test are ran against ten runs for now.

## Orders

Benchmarks for creating new orders between client and server - latency. 

### Post

Create a new order of a static set of data. Random orders are not used in test.

```
docker-compose exec core deno run --allow-run --allow-read  --allow-net --allow-env ./benchmarks/post-order.ts
or
deno run --allow-run --allow-read  --allow-net --allow-env ./benchmarks/post-order.ts
```

#### Simultaneous

10 simultaneous request x10

Metrics: avg 510.6ms - per entry 50.05ms - max cpu 13%

#### Parallel

3 concurrent request x10

Metrics: avg 75ms - per entry 25.05ms - max cpu 27%


### GET

Get orders from collections redis(max:20) -> mongodb.

```
docker-compose exec core deno run --allow-run --allow-read  --allow-net --allow-env ./benchmarks/get-order.ts
or
deno run --allow-run --allow-read  --allow-net --allow-env ./benchmarks/get-order.ts
```

#### Simultaneous

10 simultaneous request x10

Metrics: avg 40ms - per entry 4ms

#### Parallel

3 concurrent request x10

Metrics: avg 5.4ms - per entry 1.6ms

