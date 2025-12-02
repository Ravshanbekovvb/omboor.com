import { useState } from 'react'

interface argumentsNavbar {
	name: string
	href: string
}
export const useSidebar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [currentNavbar, setCurrentNavbar] = useState<{
		currentLinkName: string
		currentLinkIcon: React.ElementType
		items: argumentsNavbar[]
	} | null>(null)
	return { isOpen, setIsOpen, currentNavbar, setCurrentNavbar }
}
