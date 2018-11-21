FROM node

WORKDIR /home/crawler

ADD ./package.json /home/crawler

RUN \
  apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y \
  gcc \
  make \
  python2.7 \
  && apt-get autoremove \
  && apt-get clean \
  && npm install -g node-gyp && \
  npm install

ENV PATH /home/crawler/node_modules/.bin:$PATH

ADD . /home/crawler

CMD \
  npm run compile && \
  npm run copy && \
  npm start
