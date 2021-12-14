# This stage installs our modules
FROM mhart/alpine-node:12

WORKDIR /comandx
COPY . /comandx

RUN npm install  --registry=http://registry.npm.taobao.org

RUN npm run build:prod && mkdir -p server/web && yes | cp -r ./dist/* ./server/web

# Then we copy over the modules from above onto a `slim` image
FROM mhart/alpine-node:12

WORKDIR /comandx/server

# If possible, run your container using `docker run --init`
# Otherwise, you can use `tini`:
# RUN apk add --no-cache tini
# ENTRYPOINT ["/sbin/tini", "--"]

COPY --from=0 /comandx/server /comandx/server
RUN npm install  --registry=http://registry.npm.taobao.org

ENTRYPOINT NODE_ENV=production node app.js >> fe.log 2>&1
