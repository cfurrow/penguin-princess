#!/bin/bash
for I in 0 1 2 3 4 5 6 7 8 9 10
do
  ../bin/convertTo128x64.sh bubbles_frame_${I}.png bubbles_frame_${I}_128x64.png
done

