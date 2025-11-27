import { Login } from '@/widgets/login'

import { Section } from '@/shared/ui'

export default function Page() {
	return (
		<Section className='flex h-full items-center justify-center'>
			<Login className='max-w-xl' />
		</Section>
	)
}
