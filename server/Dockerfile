FROM node:8.9.3
MAINTAINER yulong <yangyulong@galaxy-future.com>
WORKDIR /commandx

COPY package*.json ./

RUN npm install  --registry=http://registry.npm.taobao.org

EXPOSE 8899

COPY . /commandx

ENTRYPOINT NODE_ENV=production node app.js >> fe.log 2>&1
