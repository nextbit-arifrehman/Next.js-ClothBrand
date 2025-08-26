import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

// Simple test route to verify basic functionality
export async function GET() {
  try {
    return NextResponse.json({ 
      message: 'API is working',
      timestamp: new Date().toISOString(),
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Test API failed', details: error.message },
      { status: 500 }
    );
  }
}