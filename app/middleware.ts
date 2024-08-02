// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');

  // if (request.nextUrl.pathname.startsWith('/orders') && !accessToken) {
  //   const loginUrl = new URL('/login', request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/orders/:path*',
};
