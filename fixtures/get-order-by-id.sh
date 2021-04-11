#!/bin/bash

id=$1

curl --location --request GET "localhost:8000/api/orders/${id}"