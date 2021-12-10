#!/bin/sh

cd ../server && docker build -t 127.0.0.1:12380/bridgx/bridgx-fe-2:0.0.1 . && docker push 127.0.0.1:12380/bridgx/bridgx-fe-2:0.0.1