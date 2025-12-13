import { cn } from '@/shared/lib/utils'
import {
	Button,
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger
} from '@/shared/ui'

import { useUsersModel } from '../model'

const arr = Array.from({ length: 20 })
export const UserPagination: React.FC<{ className?: string }> = ({ className }) => {
	const { page, limit, pathname, createQueryString, data } = useUsersModel()
	return (
		<Pagination className={cn('flex w-full items-center justify-between', className)}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href={`${pathname}/?page=${page - 1}&limit=${limit}`} />
				</PaginationItem>

				{[
					Array.from({ length: Number(data?.totalPages) ?? 0 }).map((_, index) => {
						const pageNumber = index + 1
						if (pageNumber < page - 9 || pageNumber > page + 9) {
							return null
						}
						return (
							<PaginationItem key={pageNumber}>
								<PaginationLink
									href={`${pathname}/?page=${pageNumber}&limit=${limit}`}
									isActive={pageNumber === page}
								>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						)
					})
				]}
				{Number(data?.totalPages) > 5 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext href={`${pathname}/?page=${page + 1}&limit=${limit}`} />
				</PaginationItem>
			</PaginationContent>
			<Select
				defaultValue={String(limit)}
				onValueChange={value => {
					console.log(value)
					createQueryString('limit', value)
				}}
			>
				<SelectTrigger asChild>
					<Button className='' variant={'secondary'}>
						Показать по {limit}
					</Button>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{Array.from({ length: 6 }).map((_, index) => {
							const value = (index + 1) * 5
							return (
								<SelectItem key={value} value={String(value)}>
									{value} строк
								</SelectItem>
							)
						})}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Pagination>
	)
}
