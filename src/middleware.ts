import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { pagesUrls } from './utils/constants';

const authPaths = [pagesUrls.LOGIN, pagesUrls.REGISTER];
const regularPaths = [pagesUrls.ACCOUNT];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;

  if (token && authPaths.includes(pathname)) {
    request.nextUrl.pathname = pagesUrls.ACCOUNT;
    return NextResponse.redirect(request.nextUrl);
  }

  if (!token && regularPaths.includes(pathname)) {
    request.nextUrl.pathname = pagesUrls.LOGIN;
    return NextResponse.redirect(request.nextUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [...authPaths, ...regularPaths],
};
