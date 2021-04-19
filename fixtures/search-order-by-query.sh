#!/bin/bash

query=$1

curl --location --request GET "http://localhost:8000/api/orders/search/${query}"