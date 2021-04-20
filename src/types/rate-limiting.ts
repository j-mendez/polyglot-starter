class RateLimiterMemory {
  constructor(options: unknown) {}
  consume(ip: string, points: number): void {}
}

export interface RateLimiter {
  RateLimiterMemory: typeof RateLimiterMemory
}
