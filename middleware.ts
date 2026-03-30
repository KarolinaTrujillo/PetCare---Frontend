import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/login', '/register', '/auth/forgot-password', '/auth/reset-password', '/auth/callback']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith('/auth/'))) {
    return NextResponse.next()
  }

  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value
  const authHeader = request.headers.get('authorization')
  const hasAuth = token || authHeader

  if (!hasAuth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const payload = JSON.parse(
      Buffer.from(token!.split('.')[1], 'base64').toString()
    )

    const rol = payload.rol

    if (pathname.startsWith('/dashboard/admin') && rol !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname.startsWith('/dashboard/veterinario') && rol !== 'VETERINARIO') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname.startsWith('/dashboard/cliente') && rol !== 'CLIENTE') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}