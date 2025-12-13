import { ChangePasswordRequestDTO } from '@/common/dto'
import { SelectSubset } from '@/generated/internal/prismaNamespace'
import { PrismaService } from '@/prisma/prisma.service'
import { UploadService } from '@/upload/upload.service'
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { UserDefaultArgs, UserFindManyArgs, UserGetPayload } from 'generated/prisma/models'
import { CreateUserRequestDTO } from '../common/dto/create-user-request.dto'
import { UpdateUserRequestDTO } from './dto/update-user-request.dto'

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly uploadService: UploadService
	) {}

	async findByPhoneNumber<T extends UserDefaultArgs>(
		phoneNumber: string,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T> | null> {
		const params = args ?? {}

		return (await this.prisma.user.findUnique({
			where: {
				phoneNumber
			},
			...params
		})) as UserGetPayload<T>
	}

	async findAll<T extends UserFindManyArgs>(
		page: string,
		limit: string,
		args?: SelectSubset<T, UserFindManyArgs>
	): Promise<{ users: UserGetPayload<T>[]; totalPages: number }> {
		const params = args ?? {}

		const pageNum = Number(page)
		const limitNum = Number(limit)

		if (isNaN(pageNum) || isNaN(limitNum))
			throw new BadRequestException('Query params page or limit must be a number')

		const [users, total] = await Promise.all([
			this.prisma.user.findMany({
				...params,
				skip: (pageNum - 1) * limitNum,
				take: limitNum
			}) as Promise<UserGetPayload<T>[]>,
			this.prisma.user.count()
		])

		const totalPages = Math.ceil(total / limitNum)

		return { users, totalPages }
	}

	async findById<T extends UserDefaultArgs>(
		userId: string,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		const user = (await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			...params
		})) as UserGetPayload<T>

		if (!user) throw new NotFoundException(`User with this ID: #${userId} is not found`)

		return user
	}

	async create<T extends UserDefaultArgs>(
		payload: CreateUserRequestDTO,
		file: Express.Multer.File,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		const { repeatPassword, ...validPayload } = payload

		const existingUser = await this.findByPhoneNumber(validPayload.phoneNumber)

		if (existingUser)
			throw new ConflictException(
				`User with this phone number: ${validPayload.phoneNumber} is already exists`
			)

		const hashedPass = await hash(validPayload.password, 10)

		if (file) {
			const { url } = await this.uploadService.uploadImage(file)

			validPayload.avatarUrl = url
		}

		return (await this.prisma.user.create({
			data: { ...validPayload, password: hashedPass },
			...params
		})) as UserGetPayload<T>
	}

	async update<T extends UserDefaultArgs>(
		userId: string,
		payload: UpdateUserRequestDTO,
		file: Express.Multer.File,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		const { id, password } = await this.findById(userId)

		const hashedPass = payload.password ? await hash(payload.password, 10) : password

		if (file) {
			const { url } = await this.uploadService.uploadImage(file)

			payload.avatarUrl = url
		}

		return (await this.prisma.user.update({
			where: {
				id
			},
			data: { ...payload, password: hashedPass },
			...params
		})) as UserGetPayload<T>
	}

	async delete<T extends UserDefaultArgs>(
		userId: string,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		const { id } = await this.findById(userId)

		return (await this.prisma.user.delete({
			where: {
				id
			},
			...params
		})) as UserGetPayload<T>
	}

	async changePassword<T extends UserDefaultArgs>(
		userId: string,
		payload: ChangePasswordRequestDTO,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		const { id, password } = await this.findById(userId)

		const isValidPassword = await compare(payload.oldPassword, password)

		if (!isValidPassword)
			throw new BadRequestException(
				'The old password you provided does not match our records'
			)

		const hashedPassword = await hash(payload.newPassword, 10)

		return (await this.prisma.user.update({
			where: {
				id
			},
			data: { password: hashedPassword },
			...params
		})) as UserGetPayload<T>
	}
}
