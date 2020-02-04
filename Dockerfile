FROM node:13-alpine

RUN apk add --no-cache jq

WORKDIR /var/lib/networkmaps
ADD . .

RUN mkdir -p /etc/networkmaps \
 && mv config.json /etc/networkmaps \
 && rm -f config.json

VOLUME /var/lib/networkmaps/diagrams
VOLUME /var/lib/networkmaps/users
VOLUME /var/lib/networkmaps/sendmail/queue

EXPOSE 3000

CMD node server.js --listen 0.0.0.0 --config /etc/networkmaps/config.json

