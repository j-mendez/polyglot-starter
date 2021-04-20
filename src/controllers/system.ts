import type { AppContext } from "../types/context.ts"
import { apiError } from "../validators/rest/api-error.ts"
import { log } from "../utils/log.ts"

export default {
  toggleRateLimit: (ctx: AppContext) => {
    try {
      if (
        ctx?.request?.headers?.get("Authorization") ===
        Deno.env.get("SYSTEM_ADMIN_PASSWORD")
      ) {
        const rateLimit = Deno.env.get("RATE_LIMITING_DISABLED")

        if (rateLimit) {
          Deno.env.delete("RATE_LIMITING_DISABLED")
        } else {
          Deno.env.set("RATE_LIMITING_DISABLED", "true")
        }

        ctx.response.body = {
          data: rateLimit
        }
      }
    } catch (e) {
      log(e)
    } finally {
      if (!ctx.response.body) {
        return apiError(ctx)
      }
    }
  },
  getRateLimit: (ctx: AppContext) => {
    ctx.response.body = Deno.env.get("RATE_LIMITING_DISABLED") || "false"
  }
}
