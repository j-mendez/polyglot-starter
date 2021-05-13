import {
  runBenchmarks,
  bench,
  prettyBenchmarkResult,
  prettyBenchmarkDown,
  prettyBenchmarkProgress
} from "../src/deps-testing.ts"
import { toggleRateLimiting } from "../src/utils/toggle-rate-limiter.ts"

const testFixture = JSON.parse(Deno.readTextFileSync("./fixtures/order.json"))

const body = JSON.stringify(testFixture)

const postOrder = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/orders", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })

  await res.arrayBuffer()
}

bench({
  name: "runs4ForSimultaneousX10",
  runs: 4,
  async func(b): Promise<void> {
    b.start()
    for (let i = 0; i < 10; i++) {
      await postOrder()
    }
    b.stop()
  }
})

bench({
  name: "runs4ForConcurrentX3",
  runs: 4,
  async func(b): Promise<void> {
    b.start()
    await Promise.all([postOrder(), postOrder(), postOrder()])
    b.stop()
  }
})

await toggleRateLimiting()
await runBenchmarks({ silent: true }, prettyBenchmarkProgress())
  .then(
    prettyBenchmarkDown((md: string) =>
      Deno.writeTextFile("./benchmarks/post-orders.md", md).catch(
        (e: Error) => {
          console.error(e.stack)
        }
      )
    )
  )
  .then(prettyBenchmarkResult())
  .catch((e: Error) => {
    console.error(e.stack)
  })
await toggleRateLimiting()
