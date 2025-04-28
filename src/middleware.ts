import { NextRequest, NextResponse } from 'next/server';

import { auth } from './auth';

const applyCspHeaders = (request: NextRequest) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = `
   script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''};
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    form-action 'self';
    base-uri 'self';
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
};

export const middleware = auth(req => {
  return applyCspHeaders(req);
});

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
