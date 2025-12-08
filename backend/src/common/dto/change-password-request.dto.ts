import { IsPasswordsMatchingConstraint } from '@/common/decorators'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, Matches, MinLength, Validate } from 'class-validator'

export class ChangePasswordRequestDTO {
	@ApiProperty({
		example: 'Password123',
		description: 'User old password. Must contain uppercase and number'
	})
	@IsString({ message: 'Old password must be a string' })
	@MinLength(3, { message: 'Old password must be at least 3 characters long' })
	@Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
		message: 'Old password must contain at least one uppercase letter and one number'
	})
	oldPassword: string

	@ApiProperty({
		example: 'NewPassword123',
		description: 'User password. Must contain uppercase and number'
	})
	@IsString({ message: 'Password must be a string' })
	@MinLength(3, { message: 'Password must be at least 3 characters long' })
	@Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
		message: 'Password must contain at least one uppercase letter and one number'
	})
	newPassword: string

	@ApiProperty({ example: 'NewPassword123', description: 'Repeat password' })
	@IsString({ message: 'Repeat password must be a string' })
	@Validate(IsPasswordsMatchingConstraint)
	repeatPassword: string
}
