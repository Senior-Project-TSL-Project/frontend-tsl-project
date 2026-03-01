import { RateLimitStore } from './types';

class RateLimiter {
  private store: RateLimitStore = {};
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // ทำความสะอาด store ทุก 1 นาที
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000);
  }

  check(identifier: string, maxRequests: number, windowMs: number): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
  } {
    const now = Date.now();
    const record = this.store[identifier];

    if (!record || now > record.resetTime) {
      // สร้าง record ใหม่หรือ reset
      this.store[identifier] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime: now + windowMs,
      };
    }

    if (record.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    record.count++;
    return {
      allowed: true,
      remaining: maxRequests - record.count,
      resetTime: record.resetTime,
    };
  }

  private cleanup() {
    const now = Date.now();
    Object.keys(this.store).forEach((key) => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();
