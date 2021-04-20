import { config } from "https://deno.land/x/dotenv/mod.ts"

const { SYSTEM_ADMIN_PASSWORD } = config({ safe: true })

export const toggleRateLimiting = async () =>
  await fetch("http://127.0.0.1:8000/api/system/ratelimit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: SYSTEM_ADMIN_PASSWORD ?? ""
    }
  })
