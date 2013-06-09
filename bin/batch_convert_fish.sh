#!/bin/bash
for I in 0 1 2 
do
  ./convertTo128.sh fish_frame_${I}.png fish_frame_${I}_128x128.png
done

