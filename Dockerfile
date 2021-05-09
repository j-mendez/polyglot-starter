FROM hayd/alpine-deno:1.9.0

ENV PORT=8000
ENV DEV=false

EXPOSE $PORT

WORKDIR /usr/src/app

USER deno

COPY ./src/deps.ts ./src/deps.ts

RUN deno cache ./src/deps.ts

ADD . .

RUN deno cache ./src/main.ts

USER root

CMD sh start.sh ${DEV:-false}