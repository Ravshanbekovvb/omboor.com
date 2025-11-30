import { NextRequest, NextResponse } from 'next/server'

// Example of default export
export default function proxy(request: NextRequest) {
	const requestCookie = request.cookies.get('accessToken')?.value
	console.log('requestCookie:', requestCookie)
	const origin = request.headers.get('origin') ?? ''
	console.log('request.headers:', request.headers)

	console.log('origin:', origin, 'asdadsads')

	if (!requestCookie) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	// console.log(cookie)
	// const Cookies = cookies.call(request)
	// console.log('cookies from next:', Cookies)
	// const Headers = headers()
	// console.log('headers:', Headers)

	// return NextResponse.redirect(new URL('/home', request.url))
	return NextResponse.next()
}
export const config = {
	matcher: [
		// '/dashboard',
		'/((?!api|_next/static|favicon.ico|login|forgot-password|_next/static|_next/image|).*)', // bularni chetlab otadi,
		'/'
	]
}
