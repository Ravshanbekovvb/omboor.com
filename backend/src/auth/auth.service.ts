import { ChangePasswordRequestDTO, CreateUserRequestDTO } from '@/common/dto'
import { TUserWithOutPassword } from '@/common/types'
import { User } from '@/generated/client'
import { UpdateUserRequestDTO } from '@/user/dto'
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
import { LoginRequestDTO, UpdateMeRequestDTO } from './dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly config: ConfigService
	) {}

	async login(request: Request, payload: LoginRequestDTO): Promise<TUserWithOutPassword> {
		const user = await this.userService.findByPhoneNumber(payload.phoneNumber)

		if (!user) throw new BadRequestException('Phone number or password is incorrect')

		const isValidPassword = await compare(payload.password, user.password)

		if (!isValidPassword) throw new BadRequestException('Phone number or password is incorrect')

		const { password, ...safeUser } = await this.saveSession(request, user)

		return safeUser
	}

	async logout(request: Request, response: Response): Promise<string> {
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
				resolve('User logged out successfully')
			})
		})
	}

	async register(request: Request, payload: CreateUserRequestDTO): Promise<TUserWithOutPassword> {
		const user = await this.userService.findByPhoneNumber(payload.phoneNumber)

		if (user)
			throw new ConflictException(
				`User with this phone number: ${payload.phoneNumber} already exists`
			)

		const newUser = await this.userService.create(payload)

		const { password, ...safeUser } = await this.saveSession(request, newUser)

		return safeUser
	}

	async me(userId: string): Promise<TUserWithOutPassword> {
		const { password, ...safeUser } = await this.userService.findById(userId)

		return safeUser
	}

	async update(userId: string, payload: UpdateMeRequestDTO): Promise<TUserWithOutPassword> {
		const { password, ...safeUser } = await this.userService.update(
			userId,
			payload as UpdateUserRequestDTO
		)

		return safeUser
	}

	async changePassword(
		userId: string,
		payload: ChangePasswordRequestDTO
	): Promise<TUserWithOutPassword> {
		const { password, ...safeUser } = await this.userService.changePassword(userId, payload)

		return safeUser
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
