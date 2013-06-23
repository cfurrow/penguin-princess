#!/bin/bash
for I in 0 1 2 3 4 5 6 7 8 9 10
do
  ../bin/convertTo128.sh foof_frame_${I}.png foof_frame_${I}_128x128.png
done

