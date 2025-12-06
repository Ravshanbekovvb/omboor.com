import { NextIntlClientProvider } from './provider-nextInt'
import { ProviderTheme } from './provider-theme'
import { QueryClientProvider } from './query-client-provider'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider>
			<NextIntlClientProvider>
				<ProviderTheme>{children}</ProviderTheme>
			</NextIntlClientProvider>
		</QueryClientProvider>
	)
}
