FROM hayd/alpine-deno:1.8.3

ENV PORT=8000

EXPOSE $PORT

WORKDIR /usr/src/app

USER deno

COPY src/deps.ts ./src/deps.ts

RUN deno cache ./src/deps.ts

ADD . .

RUN deno cache ./src/main.ts

CMD ["run", "--allow-read", "--allow-env", "--allow-net", "./src/main.ts"]