import axios from "axios";
import { NextResponse } from "next/server";
import { performSecurityChecks, addSecurityHeaders } from '@/lib/security/middleware';

interface ResponseData {
  id: string,
  model: string,
  disabled: boolean;
}

export async function GET(request: Request) {
  const securityCheck = performSecurityChecks(request, {
    rateLimit: {
      windowMs: 60000, // 1 min
      maxRequests: 20, // 20 req per min
    }
  });

  if (!securityCheck.passed) {
    return securityCheck.response;
  }
  if (process.env.BACKEND_API && process.env.BACKEND_API_TOKEN) {
    try {
      const res = await axios.get(
        process.env.BACKEND_API + "/models-dropdown",
        {
          headers: {
            "x-api-key": process.env.BACKEND_API_TOKEN,
          },
        }
      );
      const response = NextResponse.json(res.data as ResponseData);
      return addSecurityHeaders(response);
    } catch (error) {
      const response = NextResponse.json(
        { 
          error: 'Failed to fetch', 
          message: process.env.NODE_ENV === 'production' 
            ? 'An error occurred while fetching' 
            : (error as Error).message || 'An error occurred while fetching'
        }, 
        { status: 500 }
      );
      return addSecurityHeaders(response);
    }
  } else {
    const response = NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Backend API configuration is missing'
      }, 
      { status: 500 }
    );
    return addSecurityHeaders(response);
  }
}