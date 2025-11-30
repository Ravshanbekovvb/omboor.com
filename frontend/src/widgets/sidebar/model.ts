import { useState } from 'react'

export const useSidebar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true)
	return { isOpen, setIsOpen }
}
