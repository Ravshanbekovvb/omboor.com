'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useAuth } from '@/shared/hooks/useAuth'

interface argumentsNavbar {
	name: string
	href: string
}
export const useSidebar = () => {
	const t = useTranslations('navbar')
	const { logout, loggingOut, me } = useAuth()
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [currentNavbar, setCurrentNavbar] = useState<{
		currentLinkName: string
		currentLinkIcon: React.ElementType
		items: argumentsNavbar[]
	} | null>(null)
	return { isOpen, setIsOpen, currentNavbar, setCurrentNavbar, logout, loggingOut, me, t }
}
