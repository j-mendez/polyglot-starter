# benchmarks

All application benchmarks with how to usage. The current benchmarks set data was ran on a 2gb - 6 CPUS docker shared instance across redis, mongo, mongo-express(admin), and a deno alpine build. The set of test are ran against ten runs for now.

## Orders

Benchmarks for creating new orders between client and server - latency. 

### Post

Create a new order of a static set of data. Random orders are not used in test. Currently on every creation the order is updated through mongo -> redis -> and meilisearch. On average it takes about 25-50ms between micro-service insert.

[View Benchmarks](benchmarks/post-orders.md)

```
docker-compose exec core deno run --allow-run --allow-read  --allow-write --allow-net --allow-env --allow-hrtime ./benchmarks/post-order.ts
# or
deno run --allow-run --allow-read  --allow-write --allow-net --allow-env --allow-hrtime ./benchmarks/post-order.ts
```

### GET

Get orders from collections redis(max:20) -> mongodb.

[View Benchmarks](benchmarks/get-orders.md)


```
docker-compose exec core deno run --allow-run --allow-read  --allow-write --allow-net --allow-env --allow-hrtime ./benchmarks/get-order.ts 
# or
deno run --allow-run --allow-read  --allow-write --allow-net --allow-env --allow-hrtime ./benchmarks/get-order.ts
```
