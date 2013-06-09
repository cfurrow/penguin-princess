#!/bin/bash

EXPECTED_ARGS=2 
E_BADARGS=1

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: `basename $0` {file-in} {file-out}"
  exit $E_BADARGS
fi

file=$1
out=$2

convert $file -filter Box -resize 128x128 $2

