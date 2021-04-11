class RateLimiterMemory {
  constructor(options: any) {}
  consume(ip: string, points: number): void {}
}

export interface RateLimiter {
  RateLimiterMemory: typeof RateLimiterMemory
}
