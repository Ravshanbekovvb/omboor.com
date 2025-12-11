'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export const netWorkStatusModel = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine)
	const t = useTranslations('networkStatus')

	const handleCheck = () => setIsOnline(navigator.onLine)
	useEffect(() => {
		window.addEventListener('online', handleCheck)
		window.addEventListener('offline', handleCheck)
	}, [handleCheck])
	return { t, isOnline }
}
