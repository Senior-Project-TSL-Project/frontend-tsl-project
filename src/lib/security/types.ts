export interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export interface SecurityConfig {
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  allowedOrigins: string[];
}
