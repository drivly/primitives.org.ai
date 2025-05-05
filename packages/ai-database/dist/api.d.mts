import * as next_server from 'next/server';
import { NextRequest } from 'next/server';

/**
 * GET handler for retrieving resources
 * Supports both collection listing and single item retrieval
 */
declare const GET: (req: NextRequest, context: {
    params: Record<string, string | string[]>;
}) => Promise<next_server.NextResponse<any>>;
/**
 * POST handler for creating new resources
 */
declare const POST: (req: NextRequest, context: {
    params: Record<string, string | string[]>;
}) => Promise<next_server.NextResponse<any>>;
/**
 * PATCH handler for updating existing resources
 */
declare const PATCH: (req: NextRequest, context: {
    params: Record<string, string | string[]>;
}) => Promise<next_server.NextResponse<any>>;
/**
 * DELETE handler for removing resources
 */
declare const DELETE: (req: NextRequest, context: {
    params: Record<string, string | string[]>;
}) => Promise<next_server.NextResponse<any>>;

export { DELETE, GET, PATCH, POST };
