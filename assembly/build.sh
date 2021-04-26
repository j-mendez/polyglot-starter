#!/bin/bash

asc visualizer.ts -b ../src/assets/visualizer.wasm -O3 --runtime stub --importMemory --use Math=JSMath --optimize -O --shrinkLevel 2 --optimizeLevel 3