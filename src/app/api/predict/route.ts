import axios from "axios";
import { NextResponse } from "next/server";

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
  if (process.env.BACKEND_API && process.env.BACKEND_API_TOKEN) {
    try {
      const requestData: RequestParams = await request.json();
      const res = await axios.post(
        process.env.BACKEND_API + "/predict",
        requestData,
        {
          headers: {
            "x-api-key": process.env.BACKEND_API_TOKEN,
          },
        }
      );
      return NextResponse.json(res.data as ResponseData);
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch', 
          message: (error as Error).message || 'An error occurred while fetching' 
        }, 
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Backend API configuration is missing'
      }, 
      { status: 500 }
    );
  }
}