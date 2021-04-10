import { Application } from "../deps.ts"

const registerEventListeners = (app: Application) => {
  app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(
      `Listening on: http${secure ? "s" : ""}://${
        hostname ?? "localhost"
      }:${port}`
    )
  })
}

export { registerEventListeners }
