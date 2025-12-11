import { NextRequest, NextResponse } from 'next/server'

// Example of default export
export default async function proxy(request: NextRequest) {
	const cookie = request.cookies.get('session')?.value
	console.log(request.nextUrl.pathname)

	if (!cookie) {
		return NextResponse.redirect(new URL('/login', request.url))
	} else if (cookie && request.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}
	return NextResponse.next()
}
export const config = {
	matcher: [
		'/dashboard',
		'/((?!api|_next/static|favicon.ico|login|forgot-password|_next/static|_next/image|).*)', // bularni chetlab otadi,
		'/'
	]
}
