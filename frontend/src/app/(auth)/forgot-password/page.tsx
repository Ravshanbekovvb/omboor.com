import { ForgotPassword } from '@/widgets/forgot-password'

import { Section } from '@/shared/ui'

export default function Page() {
	return (
		<Section className='flex h-full items-center justify-center'>
			<ForgotPassword className='max-w-4xl' />
		</Section>
	)
}
