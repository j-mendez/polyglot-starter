import { runBenchmarks, bench } from "https://deno.land/std/testing/bench.ts"
import { toggleRateLimiting } from "../utils/toggle-rate-limiter.ts"

const getOrder = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const resBody = new Uint8Array(await res.arrayBuffer())
  await Deno.stdout.write(resBody)
}

bench({
  name: "runs10ForSimultaneousX10",
  runs: 10,
  async func(b): Promise<void> {
    b.start()
    for (let i = 0; i < 10; i++) {
      await getOrder()
      console.log(i + 1)
    }
    b.stop()
  }
})

bench({
  name: "runs10ForParallelX3",
  runs: 10,
  async func(b): Promise<void> {
    b.start()
    await Promise.all([getOrder(), getOrder(), getOrder()])
    b.stop()
  }
})

await toggleRateLimiting()
await runBenchmarks()
await toggleRateLimiting()
