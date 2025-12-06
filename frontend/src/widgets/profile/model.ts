'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { countries } from '@/shared/constants'
import { useAuth } from '@/shared/hooks/useAuth'

const formSchema = z.object({
	name: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	imgUrl: z.string().optional(),
	language: z.enum(countries.map(c => c.code.toLowerCase())),
	theme: z.enum(['light', 'dark', 'system'])
})
type TForm = z.infer<typeof formSchema>
export const useProfile = () => {
	const router = useRouter()
	const { theme, setTheme } = useTheme()
	const { me } = useAuth()
	const locale = useLocale()
	const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: me?.name || '',
			lastName: me?.name || '',
			imgUrl: typeof me?.imgUrl === 'string' ? me.imgUrl : undefined,
			theme: undefined,
			language: locale
		}
	})
	const onSubmit: SubmitHandler<TForm> = async data => {
		console.log(data)

		const { theme, language, ...safeData } = data
		setTheme(theme)
		document.cookie = `locale=${language}; path=/; max-age=31536000; SameSite=Lax`

		toast.success('Profile updated successfully', {
			closeButton: true
		})
		router.refresh()
	}
	useEffect(() => {
		if (theme) {
			form.setValue('theme', theme as 'light' | 'dark' | 'system')
		}
	}, [theme, form])
	return { me, form, selectedAvatar, setSelectedAvatar, onSubmit }
}
