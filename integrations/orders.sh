#!/bin/bash

echo "create new order"
id=`sh ./fixtures/post-order.sh | jq -r '.[].id'`
echo "find order by new order id: $id"
new_order_names=`sh ./fixtures/get-order-by-id.sh $id | jq '.items[].name'`
echo "found order with items named $new_order_names"
new_order_search=`sh ./fixtures/search-order-by-query.sh "$new_order_names" | jq`
echo "search results found $new_order_search"
new_order_delete=`sh ./fixtures/delete-order-by-id.sh $id`
echo "deleted order $new_order_delete"