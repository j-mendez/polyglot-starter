import { Application } from "../deps.ts"

export const setApplicationRoutes = async (app: Application) => {
  for (const dirEntry of Deno.readDirSync("src/routes")) {
    const routerPath = `../routes/${dirEntry.name}`
    if (!routerPath.includes(".test.") && /.ts|.js|.mjs/.test(routerPath)) {
      const { router } = await import(routerPath).catch((e: Error) => {
        console.error(`${routerPath} error`, e)
      })
      app.use(router.routes(), router.allowedMethods())
    }
  }
}
