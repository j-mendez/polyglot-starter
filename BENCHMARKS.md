# benchmarks

All application benchmarks with how to usage. The current benchmarks set data was ran on a 2gb - 6 CPUS docker shared instance across redis, mongo, mongo-express(admin), and a deno alpine build.

## Post

### Orders

Create a new order of a static set of data.

#### Simultaneous

Time it takes to process 100 orders in sequence. Run the following commands below to test.

```
docker-compose exec core deno run --allow-run --allow-read  --allow-net --allow-env ./benchmarks/post-order.ts
or
deno run --allow-run --allow-read  --allow-net --allow-env ./benchmarks/post-order.ts
# Metrics avg 5326ms - per entry 53.26ms - max cpu 13%
```