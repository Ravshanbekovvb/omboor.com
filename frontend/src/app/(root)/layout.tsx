export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<main className='flex size-full flex-col overflow-y-auto'>{children}</main>
		</>
	)
}
