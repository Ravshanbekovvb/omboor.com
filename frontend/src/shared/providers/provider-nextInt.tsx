import { NextIntlClientProvider as Provider } from 'next-intl'

export const NextIntlClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <Provider>{children}</Provider>
}
