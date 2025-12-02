import { ThemeToggle } from '@/entities/theme-toggle'

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<main className='dark:bg-foreground flex size-full flex-col overflow-y-auto bg-white'>
				{children}
				<ThemeToggle className='absolute top-4 right-4 min-h-10 min-w-10' />
			</main>
		</>
	)
}
