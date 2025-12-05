import { ApiProperty } from '@nestjs/swagger'
import { IsString, Matches } from 'class-validator'

export class LoginRequestDTO {
	@ApiProperty({ example: '+1234567890', description: 'User phone number' })
	@IsString({ message: 'Phone number must be a string' })
	phoneNumber: string

	@ApiProperty({ example: 'passWord123', description: 'User password' })
	@IsString({ message: 'Password must be a string' })
	@Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
		message: 'Password must contain at least one uppercase letter and one number'
	})
	password: string
}
