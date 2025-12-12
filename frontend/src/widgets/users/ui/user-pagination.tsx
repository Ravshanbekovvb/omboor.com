import { cn } from '@/shared/lib/utils'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/shared/ui'

import { useUsersModel } from '../model'

export const UserPagination: React.FC<{ className?: string }> = ({ className }) => {
	const { page, limit } = useUsersModel()
	return (
		<Pagination className={cn('flex w-full items-start', className)}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href={`/?page=${page - 1}&limit=${limit}`} />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='#'>1</PaginationLink>
				</PaginationItem>
				{/* <PaginationItem>
					<PaginationEllipsis />
				</PaginationItem> */}
				<PaginationItem>
					<PaginationNext href='#' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
