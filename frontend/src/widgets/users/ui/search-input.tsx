import { RiSearch2Line } from 'react-icons/ri'

import { cn } from '@/shared/lib/utils'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui'

import { useUsersModel } from '../model'

interface SearchInputProps {
	className?: string
}
export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
	const { t } = useUsersModel()
	return (
		<InputGroup className={cn('', className)}>
			<InputGroupAddon>
				<RiSearch2Line className='size-5' />
			</InputGroupAddon>
			<InputGroupInput placeholder={t('search')} />
			<InputGroupAddon align='inline-end'>12 results</InputGroupAddon>
		</InputGroup>
	)
}
