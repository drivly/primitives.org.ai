import { NextRequest, NextResponse } from 'next/server'
import { PayloadDB } from './db'

/**
 * Context object passed to API handlers
 */
export type ApiContext = {
  params: Record<string, string | string[]>
  url: URL
  path: string
  domain: string
  origin: string
  db: PayloadDB
  req: NextRequest
}

export type ApiHandler<T = any> = (req: NextRequest, ctx: ApiContext) => Promise<T> | T

/**
 * Creates an API handler with enhanced context
 * @param handler - Function to handle the API request
 * @returns Next.js API handler function
 */
export const API = (handler: ApiHandler) => {
  return async (req: NextRequest, context: { params: Record<string, string | string[]> }) => {
    try {
      const url = new URL(req.url)
      const path = url.pathname
      const domain = url.hostname
      const origin = url.origin

      const db = {} as PayloadDB

      const ctx: ApiContext = {
        params: context.params,
        url,
        path,
        domain,
        origin,
        db,
        req,
      }

      const result = await handler(req, ctx)

      if (result instanceof NextResponse) {
        return result
      }

      return NextResponse.json(result)
    } catch (error) {
      console.error('API Error:', error)

      const status = error instanceof Error && 'statusCode' in error ? (error as any).statusCode : 500
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'

      const errorResponseBody = {
        error: {
          message: errorMessage,
          status,
        },
      }
      
      return NextResponse.json(errorResponseBody, { status })
    }
  }
}
