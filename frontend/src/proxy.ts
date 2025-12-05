import { NextRequest, NextResponse } from 'next/server'

// Example of default export
export default async function proxy(request: NextRequest) {
	const cookie = request.cookies.get('session')?.value

	if (!cookie) {
		return NextResponse.redirect(new URL('/login', request.url))
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
