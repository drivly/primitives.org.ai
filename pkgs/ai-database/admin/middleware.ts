import { NextRequest, NextResponse } from 'next/server'
import { initializePayload } from './lib/payload'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  const payload = await initializePayload()
  
  return res
}

export const config = {
  matcher: ['/api/:path*'],
}
