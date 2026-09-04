import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export default async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname
    const cookieHeader = request.headers.get('cookie') || "";
    const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, { headers: { cookie: cookieHeader } });
    const session = response.ok ? await response.json() : null;
    
    if (path === "/") {
        if (!session) {
            return NextResponse.rewrite(new URL('/landing', request.url))
        } else {
            return NextResponse.rewrite(new URL('/dashboard', request.url))
        }
    } else {
        if (!session) {
            return NextResponse.redirect(new URL('/auth', request.url))
        }
    }
}
export const config = { 
    matcher: ['/', '/dashboard/:path*', '/active-workout/:path*'] 
};