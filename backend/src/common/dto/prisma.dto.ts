import { Plan, Unit, UserRole } from '@/generated/enums'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string

	@ApiProperty({ required: false, nullable: true })
	imgUrl?: string | null

	@ApiProperty()
	email: string

	@ApiProperty({ enum: UserRole })
	role: UserRole

	@ApiProperty({ enum: Plan })
	plan: Plan

	@ApiProperty()
	createdAt: Date
}

export class StoreDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string

	@ApiProperty()
	userId: string
}

export class ProductDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string

	@ApiProperty({ required: false, nullable: true })
	description?: string | null

	@ApiProperty({ required: false, nullable: true })
	imgUrl?: string | null

	@ApiProperty({ required: false, nullable: true })
	barcode?: string | null

	@ApiProperty({ required: false, nullable: true })
	article?: string | null

	@ApiProperty({ required: false, nullable: true })
	brand?: string | null

	@ApiProperty({ required: false, nullable: true })
	category?: string | null

	@ApiProperty({ required: false, nullable: true })
	container?: string | null

	@ApiProperty({ required: false, nullable: true })
	containerNumber?: number | null

	@ApiProperty({ required: false, nullable: true })
	options?: string | null

	@ApiProperty()
	quantity: number

	@ApiProperty({ enum: Unit })
	unit: Unit

	@ApiProperty()
	price: number

	@ApiProperty({ required: false, nullable: true })
	discount?: number | null

	@ApiProperty()
	createdAt: Date
}
