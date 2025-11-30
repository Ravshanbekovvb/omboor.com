import { IsPasswordsMatchingConstraint } from '@/common/decorators/is-passwords-matching.decorator'
import { IsEmail, IsString, IsUrl, Matches, MinLength, Validate } from 'class-validator'

export class CreateUserRequestDTO {
	@IsString({ message: 'Name must be a string' })
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	name: string

	@IsString({ message: 'Password must be a string' })
	@MinLength(3, { message: 'Password must be at least 3 characters long' })
	@Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
		message: 'Password must contain at least one uppercase letter and one number'
	})
	password: string

	@IsString({ message: 'Repeat password must be a string' })
	@Validate(IsPasswordsMatchingConstraint)
	repeatPassword: string

	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Email must be a valid email address' })
	email: string

	@IsUrl()
	@IsUrl({}, { message: 'Image url must be a valid URL' })
	imgUrl?: string
}
