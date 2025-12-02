import { SelectSubset } from '@/generated/internal/prismaNamespace'
import { PrismaService } from '@/prisma/prisma.service'
import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { hash } from 'bcrypt'
import { UserDefaultArgs, UserFindManyArgs, UserGetPayload } from 'generated/prisma/models'
import { CreateUserRequestDTO } from '../common/dto'
import { UpdateUserRequestDTO } from './dto/update-user-request.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async findByEmail<T extends UserDefaultArgs>(
		email: string,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T> | null> {
		const params = args ?? {}

		return (await this.prisma.user.findUnique({
			where: {
				email
			},
			...params
		})) as UserGetPayload<T>
	}

	async findAll<T extends UserFindManyArgs>(
		args?: SelectSubset<T, UserFindManyArgs>
	): Promise<UserGetPayload<T>[]> {
		return await this.prisma.user.findMany(args)
	}

	async findById<T extends UserDefaultArgs>(
		id: string,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		const user = (await this.prisma.user.findUnique({
			where: {
				id
			},
			...params
		})) as UserGetPayload<T>

		if (!user) throw new NotFoundException(`User with this ID: #${id} is not found`)

		return user
	}

	async create<T extends UserDefaultArgs>(
		payload: CreateUserRequestDTO,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		const { repeatPassword, ...validPayload } = payload

		const existingUser = await this.findByEmail(validPayload.email)

		if (existingUser)
			throw new ConflictException(
				`User with this email: ${validPayload.email} is already exists`
			)

		return (await this.prisma.user.create({
			data: validPayload,
			...params
		})) as UserGetPayload<T>
	}

	async update<T extends UserDefaultArgs>(
		id: string,
		authorizedUserId: string,
		payload: UpdateUserRequestDTO,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		const user = await this.findById(id)

		if (user.id !== authorizedUserId)
			throw new ForbiddenException('You are not allowed to edit other users')

		const hashedPass = payload.password ? await hash(payload.password, 10) : user.password

		return (await this.prisma.user.update({
			where: {
				id
			},
			data: { ...payload, password: hashedPass },
			...params
		})) as UserGetPayload<T>
	}

	async delete<T extends UserDefaultArgs>(
		id: string,
		args?: SelectSubset<T, UserDefaultArgs>
	): Promise<UserGetPayload<T>> {
		const params = args ?? {}

		return (await this.prisma.user.delete({
			where: {
				id
			},
			...params
		})) as UserGetPayload<T>
	}
}
