FROM hayd/alpine-deno:1.8.3

ENV PORT=8000

EXPOSE $PORT

WORKDIR /usr/src/app

USER deno

COPY ./deps.ts ./deps.ts

RUN deno cache ./deps.ts

ADD . .

RUN deno cache ./main.ts

CMD ["run", "--allow-read", "--allow-env", "--allow-net", "./main.ts"]