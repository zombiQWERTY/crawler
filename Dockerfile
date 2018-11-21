FROM node

WORKDIR /home/crawler

ADD ./package.json /home/crawler

RUN \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
  apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y \
  gcc \
  make \
  python2.7 \
  yarn \
  && apt-get autoremove \
  && apt-get clean \
  && npm install -g node-gyp && \
  yarn \
  echo '{}' > /home/crawler/config/production.json

# echo ... is a stub

ENV PATH /home/crawler/node_modules/.bin:$PATH

ADD . /home/crawler

CMD \
  yarn run compile && \
  yarn run copy && \
  yarn run start
