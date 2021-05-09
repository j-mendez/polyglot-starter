#!/bin/bash

if [[ $1=="true" ]]
then
	echo "development"
	deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts
	denon run --allow-read --allow-env --allow-net ./src/main.ts
else
	echo "production"
	deno run --allow-read --allow-env --allow-net ./src/main.ts
fi