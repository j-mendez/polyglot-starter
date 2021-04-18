# benchmarks

All application benchmarks with how to usage. The current benchmarks set data was ran on a 2gb - 6 CPUS docker shared instance across redis, mongo, mongo-express(admin), and a deno alpine build.

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

Metrics: avg 510.6ms - per entry 50.05ms - max cpu 13%

#### Parallel

3 concurrent request x10

Metrics: avg 75ms - per entry 25.05ms - max cpu 27%
