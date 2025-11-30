import { CreateUserRequestDTO } from '@/user/dto/create-user-request.dto'
import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'IsPasswordsMatchingConstraint', async: false })
export class IsPasswordsMatchingConstraint implements ValidatorConstraintInterface {
	validate(repeatPassword: string, validationArguments: ValidationArguments): boolean {
		const payload = validationArguments.object as CreateUserRequestDTO

		return payload.password === repeatPassword
	}

	defaultMessage(): string {
		return 'Passwords is not matching'
	}
}
