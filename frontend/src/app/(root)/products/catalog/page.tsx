import { IoArchiveSharp } from 'react-icons/io5'
import { MdOutlineDisplaySettings } from 'react-icons/md'

import { Title } from '@/entities/title'

import { Button, Section } from '@/shared/ui'

export default function Page() {
	return (
		<Section className='flex items-center justify-between'>
			<Title title='Каталог' />
			<div className='flex items-center gap-5'>
				<Button type='button' className='size-15' tooltip='Aрхивированные каталоги'>
					<IoArchiveSharp className='text-brand-primary size-6' />
				</Button>
				<Button type='button' className='size-15' tooltip='Управления каталогом'>
					<MdOutlineDisplaySettings className='text-brand-primary size-6' />
				</Button>
			</div>
		</Section>
	)
}
