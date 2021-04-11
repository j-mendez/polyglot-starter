#!/bin/bash

curl --location --request GET 'localhost:8000/api/orders' \
--header 'Content-Type: application/json'