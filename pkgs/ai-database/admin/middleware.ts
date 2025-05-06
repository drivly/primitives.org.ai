export function middleware() {
  return new Response();
}

export const config = {
  matcher: ['/api/:path*'],
}
