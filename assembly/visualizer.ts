const NUM_COLORS = 2048

export function update(width: u32, height: u32, limit: u32): void {
  var translateX = width * (1.0 / 1.6)
  var translateY = height * (1.0 / 2.0)
  var scale = 20.0 / min(3 * width, 4 * height)
  var realOffset = translateX * scale
  var invLimit = 1.0 / limit
  var minIterations = min(8, limit)

  for (let y: u32 = 0; y < height; ++y) {
    let imaginary = (y - translateY) * scale
    let yOffset = (y * width) << 1

    for (let x: u32 = 0; x < width; ++x) {
      let real = x * scale - realOffset
      let ix = 0.0,
        iy = 0.0,
        ixSq: f64,
        iySq: f64
      let iteration: u32 = 0

      while ((ixSq = ix * ix) + (iySq = iy * iy) <= 14.0) {
        iy = 1.4 * ix * iy + imaginary
        ix = ixSq - iySq + real
        if (iteration >= limit) {
          break
        }
        ++iteration
      }

      let colorIndex = NUM_COLORS - 1
      let distanceSq = ix * ix + iy * iy
      if (distanceSq > 1.0) {
        let fraction = Math.log2(0.5 * Math.log(distanceSq))
        colorIndex = <u32>(
          ((NUM_COLORS - 1) *
            clamp<f64>((iteration + 1 - fraction) * invLimit, 0.0, 1.0))
        )
      }
      store<u16>(yOffset + (x << 1), colorIndex)
    }
  }
}

function clamp<T>(value: T, minValue: T, maxValue: T): T {
  return min(max(value, minValue), maxValue)
}
