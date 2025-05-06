import { nextHandler } from 'payload/next'
import { NextRequest } from 'next/server'
import config from '../../../payload.config'

export async function GET(req: NextRequest) {
  return nextHandler({
    req,
    config,
  })
}

export async function POST(req: NextRequest) {
  return nextHandler({
    req,
    config,
  })
}

export async function PUT(req: NextRequest) {
  return nextHandler({
    req,
    config,
  })
}

export async function PATCH(req: NextRequest) {
  return nextHandler({
    req,
    config,
  })
}

export async function DELETE(req: NextRequest) {
  return nextHandler({
    req,
    config,
  })
}

export const dynamic = 'force-dynamic'
