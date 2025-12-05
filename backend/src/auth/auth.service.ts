import { CreateUserRequestDTO } from '@/common/dto'
import { User } from '@/generated/client'
import { UserService } from '@/user/user.service'
import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import { LoginRequestDTO } from './dto/login-request.dto'
@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly config: ConfigService
	) {}

	async login(request: Request, payload: LoginRequestDTO): Promise<User> {
		const user = await this.userService.findByPhoneNumber(payload.phoneNumber)

		if (!user) throw new BadRequestException('Phone number or password is incorrect')

		const isValidPassword = await compare(payload.password, user.password)

		if (!isValidPassword) throw new BadRequestException('Phone number or password is incorrect')

		return this.saveSession(request, user)
	}

	async logout(request: Request, response: Response): Promise<void> {
		return new Promise((resolve, reject) => {
			request.session.destroy(err => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Failed to destroy the session. Please try again later'
						)
					)
				}

				response.clearCookie(this.config.getOrThrow<string>('SESSION_NAME'))
				resolve()
			})
		})
	}

	async register(request: Request, payload: CreateUserRequestDTO): Promise<User> {
		const user = await this.userService.findByPhoneNumber(payload.phoneNumber)

		if (user)
			throw new ConflictException(
				`User with this phone number: ${payload.phoneNumber} already exists`
			)

		const newUser = await this.userService.create(payload)

		return this.saveSession(request, newUser)
	}

	async me(userId: string): Promise<User> {
		return await this.userService.findById(userId)
	}

	private async saveSession(request: Request, user: User): Promise<User> {
		return new Promise((resolve, reject) => {
			request.session.userId = user.id

			request.session.save(err => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Failed to save the session. Please check that your session settings are configured correctly'
						)
					)
				}

				return resolve(user)
			})
		})
	}
}
