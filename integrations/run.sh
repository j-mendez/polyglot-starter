#!/bin/bash

docker-compose exec --user=root --privileged core sh ./integrations/install-deps.sh
docker-compose exec core sh ./integrations/orders.sh