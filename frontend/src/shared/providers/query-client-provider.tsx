'use client'
import { QueryClientProvider as ClientProvider } from '@tanstack/react-query'

import { queryClient } from '../lib'

export const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <ClientProvider client={queryClient}>{children}</ClientProvider>
}
