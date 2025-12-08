'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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
	const t = useTranslations('profile')
	const { me, updateMe, updatingMe } = useAuth()
	const router = useRouter()
	const { theme, setTheme } = useTheme()
	const locale = useLocale()
	const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			lastName: '',
			imgUrl: undefined,
			theme: 'system',
			language: locale
		}
	})
	const onSubmit: SubmitHandler<TForm> = async data => {
		const { theme, language, ...safeData } = data
		console.log(data)
		updateMe(safeData, {
			onSuccess: () => {
				setTheme(theme)
				document.cookie = `locale=${language}; path=/; max-age=31536000; SameSite=Lax`
				router.refresh()
			}
		})
	}
	useEffect(() => {
		if (me) {
			form.reset({
				name: me.name,
				lastName: me.lastName,
				imgUrl: typeof me.imgUrl === 'string' ? me.imgUrl : undefined,
				language: locale,
				theme: theme as 'light' | 'dark' | 'system'
			})
		}
	}, [me, theme, locale, form])
	return {
		form,
		selectedAvatar,
		setSelectedAvatar,
		onSubmit,
		updatingMe,
		t
	}
}
