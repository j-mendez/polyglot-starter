#!/bin/bash

curl --location --request POST 'localhost:8000/api/orders' \
--header 'Content-Type: application/json' \
--data-raw '{
    "random": true
}'