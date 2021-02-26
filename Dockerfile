FROM ianwalter/puppeteer:latest
WORKDIR /app
ADD . /app

RUN yarn install

CMD yarn wdio