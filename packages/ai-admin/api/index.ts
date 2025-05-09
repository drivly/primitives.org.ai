import { NextRequest, NextResponse } from 'next/server'

/**
 * API handler for ai-admin
 */
export const GET = async (req: NextRequest) => {
  return NextResponse.json({
    name: 'ai-admin',
    version: '0.1.0',
    status: 'ok',
  })
}
