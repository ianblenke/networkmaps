FROM node:13-alpine

RUN apk add --no-cache jq bash python3-dev build-base

WORKDIR /var/lib/networkmaps
ADD package.json .
ADD package-lock.json .
RUN npm install
ADD . .

VOLUME /var/lib/networkmaps/diagrams
VOLUME /var/lib/networkmaps/users
VOLUME /var/lib/networkmaps/sendmail/queue

EXPOSE 3000

CMD /var/lib/networkmaps/run.sh
