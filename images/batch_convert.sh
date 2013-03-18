#!/bin/bash
for I in 0 1 2 3
do
  ~/scripts/convertTo512.sh frame_${I}.png frame_${I}_512x512.png
done
