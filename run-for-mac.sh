#!/usr/bin/env bash
# deploy fe for mac env
sed "s/127.0.0.1:9090/host.docker.internal:9099/g" $(pwd)/server/config/host.js > $(pwd)/server/config/host.js.1
sed "s/127.0.0.1:9091/host.docker.internal:9091/g" $(pwd)/server/config/host.js.1 > $(pwd)/server/config/host.js.mac
docker run -d --name bridgx_fe -p 80:80 --add-host host.docker.internal:host-gateway -v $(pwd)/server/config/host.js.mac:/bridgx-fe/server/config/host.js galaxyfuture/bridgx-fe:latest
