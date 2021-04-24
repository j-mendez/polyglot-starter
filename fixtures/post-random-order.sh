#!/bin/bash

curl --location --request POST 'http://127.0.0.1:8000/api/orders' \
--header 'Content-Type: application/json' \
--data-raw '{
    "random": true
}'