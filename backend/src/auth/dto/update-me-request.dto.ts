import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator'

export class UpdateMeRequestDTO {
	@ApiProperty({ example: 'Bekzod', description: 'User name' })
	@IsString({ message: 'Name must be a string' })
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	name: string

	@ApiProperty({ example: 'Ravshanbekov', description: 'User last name' })
	@IsString({ message: 'Last name must be a string' })
	@MinLength(3, { message: 'Last name must be at least 3 characters long' })
	lastName: string

	@ApiPropertyOptional({
		example: 'https://example.com/avatar.png',
		description: 'User avatar URL'
	})
	@IsUrl({}, { message: 'Image url must be a valid URL' })
	@IsOptional()
	imgUrl?: string
}
