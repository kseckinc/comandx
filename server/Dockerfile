FROM node:8.9.3
MAINTAINER yulong <yangyulong@galaxy-future.com>
WORKDIR /commandx

COPY package*.json ./

ENV BRIDGX_HOST=""

ENV SCHEDULER_HOST=""

ENV K8S_HOST=""

ENV PORT=""

RUN npm install  --registry=http://registry.npm.taobao.org

COPY . /commandx

ENTRYPOINT bridgx_host=$BRIDGX_HOST scheduler_host=$SCHEDULER_HOST k8s_host=$K8S_HOST port=$PORT node app.js >> fe.log 2>&1
