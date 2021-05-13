import {
  runBenchmarks,
  bench,
  prettyBenchmarkResult,
  prettyBenchmarkDown,
  prettyBenchmarkProgress
} from "../src/deps-testing.ts"
import { toggleRateLimiting } from "../src/utils/toggle-rate-limiter.ts"

const getOrder = async (endpoint?: string) => {
  const res = await fetch(`http://127.0.0.1:8000/${endpoint ?? "api/orders"}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  await res.arrayBuffer()
}

bench({
  name: "runs10ForSimultaneousX10",
  runs: 10,
  async func(b): Promise<void> {
    b.start()
    for (let i = 0; i < 10; i++) {
      await getOrder()
    }
    b.stop()
  }
})

bench({
  name: "runs10ForParallelX2",
  runs: 10,
  async func(b): Promise<void> {
    b.start()
    await Promise.all([getOrder(), getOrder()])
    b.stop()
  }
})

const searchEndPoint = "api/orders/search/simple order"

bench({
  name: "runs10ForSearchParallelX2",
  runs: 10,
  async func(b): Promise<void> {
    b.start()
    await Promise.all([getOrder(searchEndPoint), getOrder(searchEndPoint)])
    b.stop()
  }
})

await toggleRateLimiting()
await runBenchmarks({ silent: true }, prettyBenchmarkProgress())
  .then(
    prettyBenchmarkDown((md: string) =>
      Deno.writeTextFile("./benchmarks/get-orders.md", md).catch((e: Error) => {
        console.error(e.stack)
      })
    )
  )
  .then(prettyBenchmarkResult())
  .catch((e: Error) => {
    console.error(e.stack)
  })
await toggleRateLimiting()
