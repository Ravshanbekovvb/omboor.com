export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<main className='dark:bg-background bg-background-light flex size-full flex-col overflow-y-auto'>
				{children}
			</main>
		</>
	)
}
