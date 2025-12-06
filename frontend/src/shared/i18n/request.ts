import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

import { locales } from './config'

export default getRequestConfig(async () => {
	const cookieStore = await cookies()
	const cookieLocale = cookieStore.get('locale')?.value

	// Validate if the locale from cookie is supported
	const locale =
		cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])
			? cookieLocale
			: 'uz'

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default
	}
})
