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
  yarn \
  && apt-get autoremove \
  && apt-get clean \
  && npm install -g node-gyp \
  && yarn \
  && mkdir /home/crawler/config \
  && echo '{}' > /home/crawler/config/production.json

# echo ... is a stub

ENV PATH /home/crawler/node_modules/.bin:$PATH

ADD . /home/crawler

CMD \
  yarn run compile && \
  yarn run start
