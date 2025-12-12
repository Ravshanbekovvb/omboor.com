'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export const netWorkStatusModel = () => {
	const t = useTranslations('networkStatus')
	const [isOnline, setIsOnline] = useState(true)

	useEffect(() => {
		// Initial check
		setIsOnline(navigator.onLine)

		// Event handlers
		const handleOnline = () => setIsOnline(true)
		const handleOffline = () => setIsOnline(false)

		// Add event listeners
		window.addEventListener('online', handleOnline)
		window.addEventListener('offline', handleOffline)

		// Cleanup function to remove event listeners
		return () => {
			window.removeEventListener('online', handleOnline)
			window.removeEventListener('offline', handleOffline)
		}
	}, [])

	return { t, isOnline }
}
