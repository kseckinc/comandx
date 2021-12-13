#!/bin/sh

cd ../server && docker build -t 127.0.0.1:12380/comandx/comandx:0.2.0 . && docker push 127.0.0.1:12380/comandx/comandx:0.2.0
