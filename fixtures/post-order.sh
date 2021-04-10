#!/bin/bash

curl --location --request POST 'localhost:8000/api/orders' \
--header 'Content-Type: application/json' \
--data-raw '{
    "items": [
        {
            "ingredients": {
                "wrap": "soft",
                "meat": "beef",
                "toppings": [
                    "lettuce"
                ],
                "cheese": "chedder"
            },
            "qty": 1
        }
    ]
}'