import { Sidebar } from '@/widgets/sidebar'

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
			</main>
		</>
	)
}
