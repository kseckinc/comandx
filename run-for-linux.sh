#!/usr/bin/env bash
# deploy fe for linux env
docker run -d --name bridgx_fe --network host galaxyfuture/bridgx-fe:v0.1.0