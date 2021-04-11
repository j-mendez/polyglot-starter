#!/bin/bash

id=$1

curl --location --request DELETE "localhost:8000/api/orders/${id}"