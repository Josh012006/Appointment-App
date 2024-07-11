
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('userHealthAppointment');

    if (!token) {
        return NextResponse.redirect(new URL('/auth/userselection', request.url));
    }

    const type = JSON.parse(token.value).type;

    const url = request.nextUrl.clone();
    if (token && !url.pathname.startsWith(`/userpage/${type}`)) {
        return NextResponse.redirect(new URL('/forbidden', request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ['/userpage/:path*'],
}