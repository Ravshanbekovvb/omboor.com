import type { Metadata } from 'next'

import { fontManrope } from '@/shared/assets'

import './globals.css'

export const metadata: Metadata = {
	title: 'Omboor',
	description: 'Omboor — платформа для управления бизнесом, продажами и товарами.'
}

export default function MainLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${fontManrope.variable} font-manrope flex h-svh w-full flex-col overflow-hidden bg-gray-200 antialiased`}
				data-scroll-behavior='smooth'
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	)
}
