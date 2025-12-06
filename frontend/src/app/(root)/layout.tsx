import { Sidebar } from '@/widgets/sidebar'

import { ThemeToggle } from '@/entities/theme-toggle'

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<main className='dark:bg-foreground flex size-full bg-white'>
				<Sidebar />
				<div className='flex-1 overflow-y-auto'>{children}</div>
				<ThemeToggle className='absolute top-4 right-4 min-h-10 min-w-10' />
			</main>
		</>
	)
}
