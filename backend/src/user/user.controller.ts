import { LIMIT_OF_USERS } from '@/common/constants'
import { Authorization } from '@/common/decorators'
import { CreateUserRequestDTO } from '@/common/dto'
import {
	ApiErrorResponseDTO,
	apiSuccessResponse,
	ApiUserResponseDTO,
	ApiUsersResponseDTO
} from '@/common/utils'
import { UserRole } from '@/generated/client'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { UpdateUserRequestDTO } from './dto/'
import { UserService } from './user.service'

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({
		description: 'Users returned successfully',
		type: ApiUsersResponseDTO
	})
	@ApiBadRequestResponse({
		description: 'Query params page or limit must be a number',
		type: ApiErrorResponseDTO
	})
	@Authorization(UserRole.ADMIN)
	@ApiQuery({ name: 'page', required: false, description: 'Page number, default 1' })
	@ApiQuery({
		name: 'limit',
		required: false,
		description: 'Items per page, default 10'
	})
	@Get()
	async findAll(@Query('page') usersPage?: string, @Query('limit') usersLimit?: string) {
		const limit = usersLimit || LIMIT_OF_USERS
		const page = usersPage || '1'

		const users = await this.userService.findAll(page, limit)

		return apiSuccessResponse(users, 'Users returned successfully')
	}

	@ApiOperation({ summary: 'Get user by id' })
	@ApiOkResponse({ description: 'User returned successfully', type: ApiUserResponseDTO })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Authorization(UserRole.ADMIN)
	@Get(':id')
	async findById(@Param('id') userId: string) {
		const user = await this.userService.findById(userId)

		return apiSuccessResponse(user, 'User returned successfully')
	}

	@ApiOperation({ summary: 'Create user' })
	@ApiOkResponse({ description: 'User created successfully', type: ApiUserResponseDTO })
	@ApiConflictResponse({
		description: 'User with this phone number is already exists'
	})
	@Authorization(UserRole.ADMIN)
	@Post()
	async create(@Body() payload: CreateUserRequestDTO) {
		const user = await this.userService.create(payload)

		return apiSuccessResponse(user, 'User created successfully')
	}

	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({ description: 'User updated successfully', type: ApiUserResponseDTO })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Authorization(UserRole.ADMIN)
	@Patch(':id')
	async update(@Param('id') userId: string, @Body() payload: UpdateUserRequestDTO) {
		const user = await this.userService.update(userId, payload)

		return apiSuccessResponse(user, 'User updated successfully')
	}

	@ApiOperation({ summary: 'Delete user' })
	@ApiOkResponse({ description: 'User deleted successfully', type: ApiUserResponseDTO })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Authorization(UserRole.ADMIN)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const user = await this.userService.delete(id)

		return apiSuccessResponse(user, 'User deleted successfully')
	}
}
