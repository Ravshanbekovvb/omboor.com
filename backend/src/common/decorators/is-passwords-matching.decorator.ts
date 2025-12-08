import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'
import { ChangePasswordRequestDTO } from '../dto'

@ValidatorConstraint({ name: 'IsPasswordsMatchingConstraint', async: false })
export class IsPasswordsMatchingConstraint implements ValidatorConstraintInterface {
	validate(repeatPassword: string, validationArguments: ValidationArguments): boolean {
		const payload = validationArguments.object as ChangePasswordRequestDTO
		return payload.newPassword === repeatPassword
	}

	defaultMessage(): string {
		return 'Passwords is not matching'
	}
}
