#!/bin/bash
for I in 0 1 2 3
do
  ~/scripts/convertTo512.sh frame_${I}.png frame_${I}_512x512.png
done
for I in 0 1 2 3 4 5 6 7 8
do
  ~/scripts/convertTo512.sh surprise_frame_${I}.png surprise_frame_${I}_512x512.png
done
