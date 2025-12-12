import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'
import { ChangePasswordRequestDTO } from '../dto'

@ValidatorConstraint({ name: 'IsChangePasswordsMatching', async: false })
export class IsChangePasswordsMatching implements ValidatorConstraintInterface {
	validate(repeatPassword: string, validationArguments: ValidationArguments): boolean {
		const payload = validationArguments.object as ChangePasswordRequestDTO

		return payload.newPassword === repeatPassword
	}

	defaultMessage(): string {
		return 'Passwords is not matching'
	}
}
