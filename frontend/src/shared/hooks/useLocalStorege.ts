import { useCallback, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue?: T) {
	const readValue = useCallback((): T | undefined => {
		if (typeof window === 'undefined') return initialValue

		try {
			const item = window.localStorage.getItem(key)
			return item ? (JSON.parse(item) as T) : initialValue
		} catch {
			return initialValue
		}
	}, [key, initialValue])

	const [storedValue, setStoredValue] = useState<T | undefined>(() => readValue())

	const setValue = useCallback(
		(value: T | ((prev: T | undefined) => T)) => {
			const newValue = value instanceof Function ? value(storedValue) : value
			setStoredValue(newValue)
			window.localStorage.setItem(key, JSON.stringify(newValue))
		},
		[key, storedValue]
	)

	return [storedValue, setValue] as const
}
