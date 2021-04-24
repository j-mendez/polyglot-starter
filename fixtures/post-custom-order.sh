#!/bin/bash

curl --location --request POST 'http://127.0.0.1:8000/api/orders' \
--header 'Content-Type: application/json' \
--data-raw '{
    "items": [
        {
            "ingredients": {
                "wrap": "hard",
                "protein": "lamb",
                "toppings": [
                    "lettuce"
                ],
                "cheese": "chedder"
            },
            "customIngredients": ["protein"],
            "qty": 2
        }
    ]
}'