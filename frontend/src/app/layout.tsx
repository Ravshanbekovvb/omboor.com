import type { Metadata } from 'next'

import { fontManrope } from '@/shared/assets'
import { Providers } from '@/shared/providers'
import { Toaster } from '@/shared/ui/sonner'

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
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${fontManrope.variable} font-manrope flex h-svh w-full flex-col overflow-hidden antialiased sm:font-medium`}
				data-scroll-behavior='smooth'
				suppressHydrationWarning
			>
				<Providers>
					{children}
					<Toaster position='top-center' />
				</Providers>
			</body>
		</html>
	)
}
