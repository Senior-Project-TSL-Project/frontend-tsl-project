import { NextResponse } from 'next/server';
import { rateLimiter } from './rateLimiter';
import { SecurityConfig } from './types';

export function getClientIdentifier(request: Request): string {
  // ใช้ IP address และ User-Agent เป็น identifier
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}-${userAgent}`;
}

export function getAllowedOrigins(): string[] {
  const origins = [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ];

  // เพิ่ม production domain ถ้ามี
  if (process.env.NEXT_PUBLIC_PRODUCTION_URL) {
    origins.push(process.env.NEXT_PUBLIC_PRODUCTION_URL);
  }

  return origins;
}

export function checkOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const allowedOrigins = getAllowedOrigins();

  // อนุญาตให้เรียกจาก same-origin (ไม่มี origin header)
  if (!origin && !referer) {
    return true;
  }

  // ตรวจสอบ origin
  if (origin) {
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed === '*') return true;
      return origin === allowed || origin.startsWith(allowed);
    });
    if (isAllowed) return true;
  }

  // ตรวจสอบ referer เป็นทางเลือกรอง
  if (referer) {
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed === '*') return true;
      return referer.startsWith(allowed);
    });
    if (isAllowed) return true;
  }

  return false;
}

export function validateContentType(request: Request): boolean {
  const contentType = request.headers.get('content-type');
  if (!contentType) return false;
  return contentType.includes('application/json');
}

export interface SecurityCheckResult {
  passed: boolean;
  response?: NextResponse;
}

export function performSecurityChecks(
  request: Request,
  config: Partial<SecurityConfig> = {}
): SecurityCheckResult {
  const defaultConfig: SecurityConfig = {
    rateLimit: {
      windowMs: 60000, // 1 นาที
      maxRequests: 30, // 30 requests ต่อนาที
    },
    allowedOrigins: getAllowedOrigins(),
    ...config,
  };

  // 1. ตรวจสอบ Origin (CORS)
  if (!checkOrigin(request)) {
    return {
      passed: false,
      response: NextResponse.json(
        { 
          error: 'Forbidden',
          message: 'Origin not allowed'
        },
        { status: 403 }
      ),
    };
  }

  // 2. Rate Limiting
  const identifier = getClientIdentifier(request);
  const rateLimitResult = rateLimiter.check(
    identifier,
    defaultConfig.rateLimit.maxRequests,
    defaultConfig.rateLimit.windowMs
  );

  if (!rateLimitResult.allowed) {
    return {
      passed: false,
      response: NextResponse.json(
        { 
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': defaultConfig.rateLimit.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          }
        }
      ),
    };
  }

  // 3. ตรวจสอบ Content-Type สำหรับ POST requests
  if (request.method === 'POST' && !validateContentType(request)) {
    return {
      passed: false,
      response: NextResponse.json(
        { 
          error: 'Bad Request',
          message: 'Content-Type must be application/json'
        },
        { status: 400 }
      ),
    };
  }

  return { passed: true };
}

export function addSecurityHeaders(response: NextResponse): NextResponse {
  // เพิ่ม security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );

  return response;
}
