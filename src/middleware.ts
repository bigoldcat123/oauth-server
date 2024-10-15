import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_SESSION_NAME } from "./constant";


export default function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  console.log(req.nextUrl.searchParams.get('client_id'));
  console.log(req.url);
  const session  = cookies().get(COOKIE_SESSION_NAME)?.value
  // validate the jwt
  if (!session) {

    // if not authenticated redirect to login, when use oauth, and add calbackurl for redirecting to authrize page instead to the dashborad page
    if (req.nextUrl.pathname.startsWith('/authorize')) {
      const callbackUrl = encodeURI(req.url)
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url))
    }

    return NextResponse.redirect(new URL('/login', req.url))
  }

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