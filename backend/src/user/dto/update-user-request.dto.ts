import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsUrl, Matches, MinLength } from 'class-validator'

export class UpdateUserRequestDTO {
	@ApiProperty({ example: 'Bekzod', description: 'User name' })
	@IsString({ message: 'Name must be a string' })
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	name: string

	@ApiProperty({ example: 'Ravshanbekov', description: 'User last name' })
	@IsString({ message: 'Last name must be a string' })
	@MinLength(3, { message: 'Last name must be at least 3 characters long' })
	lastName: string

	@ApiPropertyOptional({
		example: 'Password123',
		description: 'User password. Must contain uppercase and number'
	})
	@IsString({ message: 'Password must be a string' })
	@MinLength(3, { message: 'Password must be at least 3 characters long' })
	@Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
		message: 'Password must contain at least one uppercase letter and one number'
	})
	@IsOptional()
	password: string

	@ApiPropertyOptional({
		example: 'https://example.com/avatar.png',
		description: 'User avatar URL'
	})
	@IsUrl({}, { message: 'Image url must be a valid URL' })
	@IsOptional()
	avatarUrl?: string
}
