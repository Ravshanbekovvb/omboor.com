import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ComponentProps, ReactNode } from 'react'

type ProviderThemeProps = ComponentProps<typeof NextThemesProvider> & {
	children: ReactNode
}
export const ProviderTheme: React.FC<ProviderThemeProps> = ({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
	return (
		<NextThemesProvider
			{...props}
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</NextThemesProvider>
	)
}
