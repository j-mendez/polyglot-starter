#!/bin/bash

curl --location --request POST 'http://127.0.0.1:8000/api/orders' \
--header 'Content-Type: application/json' \
--data-raw '{
    "items": [
        {
            "ingredients": {
                "wrap": "soft",
                "protein": "turkey",
                "toppings": [
                    "lettuce"
                ],
                "cheese": "chedder"
            },
            "qty": 1
        }
    ]
}'