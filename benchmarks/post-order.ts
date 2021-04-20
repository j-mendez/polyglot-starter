import {
  runBenchmarks,
  bench,
  prettyBenchmarkResult,
  prettyBenchmarkDown,
  prettyBenchmarkProgress
} from "../test-deps.ts"
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

  await Deno.stdout.write(new Uint8Array(await res.arrayBuffer()))
}

bench({
  name: "runs10ForSimultaneousX10",
  runs: 10,
  async func(b): Promise<void> {
    b.start()
    for (let i = 0; i < 10; i++) {
      await postOrder()
      console.log(i + 1)
    }
    b.stop()
  }
})

bench({
  name: "runs6ForParallelX2",
  runs: 6,
  async func(b): Promise<void> {
    b.start()
    await Promise.all([postOrder(), postOrder()])
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
