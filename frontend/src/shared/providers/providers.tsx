import { ProviderTheme } from './provider-theme'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <ProviderTheme>{children}</ProviderTheme>
}
