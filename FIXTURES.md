# fixtures

test the application with ease using the commands below.

### POST order
create new order.
```
./fixtures/post-order.sh
```
create new random order.
```
./fixtures/post-random-order.sh
```
### GET orders
retrieve all orders.
```
./fixtures/get-orders.sh
```
### GET order by id
retrieve a single order by id, replace `$id` with the order id returned on create order.
```
./fixtures/get-order-by-id.sh "$id"
```
### DELETE order by id
delete a single order by id, replace `$id` with the order id returned on create order.
```
./fixtures/delete-order-by-id.sh "$id"
```

### Search order by query
search orders by query, replace `$query` with a valid property from the order like name, ingredient, and etc. This uses the search server to retrieve results.
```
./fixtures/search-order-by-query.sh `$query`
```

### Test rate limit
test rate limiter
```
./fixtures/test-rate-limit.sh
```