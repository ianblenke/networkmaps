#!/bin/bash

CONFIG=/etc/networkmaps/config.json
mkdir -p /etc/networkmaps

echo '{}' > $CONFIG

env | grep -e '^config__' | sed -e 's/^config__//' | while read line; do
  key="$(echo $line | cut -d= -f1)"
  value="$(echo $line | cut -d= -f2-)"
  dotted="$(echo $key | sed -e 's/__/./'g)"
  jq ".${dotted}=${value}" $CONFIG > $CONFIG.$$
  mv -f $CONFIG.$$ $CONFIG
done

exec node server.js --listen 0.0.0.0 --config $CONFIG $@
