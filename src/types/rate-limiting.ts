class RateLimiterMemory {
  constructor(options: any) {}
  consume(ip: string, points: number): any {}
}

export interface RateLimiter {
  RateLimiterMemory: typeof RateLimiterMemory
}
