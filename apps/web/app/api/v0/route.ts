// Empty route file
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ time: new Date().toISOString() });
}
