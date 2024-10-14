import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_SESSION_NAME } from "./constant";

export default function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  console.log(req.nextUrl.searchParams.get('client_id'));
  console.log(req.url);
  


  const cookie = cookies()
  const session = cookie.get(COOKIE_SESSION_NAME)
  //TODO validate the jwt
  if (!session) {

    if (req.nextUrl.pathname.startsWith('/authorize')) {
      const callbackUrl = encodeURI(req.url)
      
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url))
    }

    return NextResponse.redirect(new URL('/login', req.url))
  }
  console.log('session is -> ', session);

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
}