import axios from "axios";
import { NextResponse } from "next/server";
import { performSecurityChecks, addSecurityHeaders } from '@/lib/security/middleware';

interface RequestParams {
  text: string;
  model: 'mt5' | 'llm';
}

interface ResponseData {
  input_text: string,
  gloss: string,
  confidence: number;
}

export async function POST(request: Request) {
  const securityCheck = performSecurityChecks(request, {
    rateLimit: {
      windowMs: 60000, // 1 นาที
      maxRequests: 15, // 15 requests ต่อนาที (น้อยกว่า GET เพราะใช้ resource มากกว่า)
    }
  });

  if (!securityCheck.passed) {
    return securityCheck.response;
  }
  if (process.env.BACKEND_API && process.env.BACKEND_API_TOKEN) {
    try {
      const requestData: RequestParams = await request.json();

      if (!requestData.text || typeof requestData.text !== 'string') {
        const response = NextResponse.json(
          { 
            error: 'Bad Request',
            message: 'Invalid or missing text parameter'
          },
          { status: 400 }
        );
        return addSecurityHeaders(response);
      }

      if (requestData.text.length > 100) {
        const response = NextResponse.json(
          { 
            error: 'Bad Request',
            message: 'Text is too long. Maximum 100 characters allowed'
          },
          { status: 400 }
        );
        return addSecurityHeaders(response);
      }

      const res = await axios.post(
        process.env.BACKEND_API + "/predict",
        requestData,
        {
          headers: {
            "x-api-key": process.env.BACKEND_API_TOKEN,
            "Content-Type": "application/json",
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
            ? 'An error occurred while processing your request' 
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