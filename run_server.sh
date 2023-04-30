#!/bin/sh -x
/app/main &
sleep 5
./run_grpcwebproxy.sh