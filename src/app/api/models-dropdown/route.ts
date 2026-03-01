import axios from "axios";
import { NextResponse } from "next/server";

interface ResponseData {
  id: string,
  model: string,
  disabled: boolean;
}

export async function GET() {
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