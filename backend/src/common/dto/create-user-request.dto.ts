import { IsPasswordsMatchingConstraint } from '@/common/decorators'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, IsUrl, Matches, MinLength, Validate } from 'class-validator'

export class CreateUserRequestDTO {
	@ApiProperty({ example: 'Bekzod', description: 'User name' })
	@IsString({ message: 'Name must be a string' })
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	name: string

	@ApiProperty({
		example: 'Password123',
		description: 'User password. Must contain uppercase and number'
	})
	@IsString({ message: 'Password must be a string' })
	@MinLength(3, { message: 'Password must be at least 3 characters long' })
	@Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
		message: 'Password must contain at least one uppercase letter and one number'
	})
	password: string

	@ApiProperty({ example: 'Password123', description: 'Repeat password' })
	@IsString({ message: 'Repeat password must be a string' })
	@Validate(IsPasswordsMatchingConstraint)
	repeatPassword: string

	@ApiProperty({ example: 'test@example.com', description: 'User email' })
	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Email must be a valid email address' })
	email: string

	@ApiPropertyOptional({
		example: 'https://example.com/avatar.png',
		description: 'User avatar URL'
	})
	@IsUrl({}, { message: 'Image url must be a valid URL' })
	@IsOptional()
	imgUrl?: string
}
