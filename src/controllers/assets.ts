import type { AppContext } from "../types/context.ts"
import { apiError } from "../validators/rest/api-error.ts"
import { log } from "../utils/log.ts"

export default {
  getAssets: async (ctx: AppContext) => {
    try {
      const file = ctx?.params?.id
      const fpath = `${Deno.cwd()}/src/assets/${file}`
      const text = await Deno.readTextFile(fpath)
      const fstats = await Deno.stat(fpath)

      ctx.response.headers.set("Content-Length", String(fstats.size))

      if (String(file).includes(".wasm")) {
        ctx.response.type = "application/wasm"
      } else if (String(file).includes(".js")) {
        ctx.response.type = "application/javascript"
      }

      ctx.response.body = text
    } catch (e) {
      log(e)
    }
  },
  streamAssets: async (ctx: AppContext) => {
    try {
      const file = ctx?.params?.id

      await ctx.send({
        path: "",
        root: `${Deno.cwd()}/src/assets/${file}`
      })
    } catch (e) {
      log(e)
    }
  }
}
