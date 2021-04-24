#!/bin/bash

id=$1

curl --location --request DELETE "http://127.0.0.1:8000/api/orders/${id}"