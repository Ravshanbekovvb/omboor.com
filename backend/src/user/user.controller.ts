import { Authorization, AuthorizedUser } from '@/common/decorators'
import { UserDto } from '@/common/dto'
import { UserRole } from '@/generated/client'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { CreateUserRequestDTO } from '../common/dto/create-user-request.dto'
import { UpdateUserRequestDTO } from './dto/update-user-request.dto'
import { UserService } from './user.service'

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({ description: 'Users returned successfully', type: UserDto, isArray: true })
	@Authorization(UserRole.ADMIN)
	@Get()
	async findAll() {
		return await this.userService.findAll()
	}

	@ApiOperation({ summary: 'Get user by id' })
	@ApiOkResponse({ description: 'User returned successfully', type: UserDto })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Authorization()
	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.userService.findById(id)
	}

	@ApiOperation({ summary: 'Create user' })
	@ApiOkResponse({ description: 'User created successfully', type: UserDto })
	@ApiConflictResponse({
		description: 'User with this email is already exists'
	})
	@Post()
	async create(@Body() payload: CreateUserRequestDTO) {
		return await this.userService.create(payload)
	}

	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({ description: 'User updated successfully', type: UserDto })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Authorization()
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@AuthorizedUser('id') authorizedUserId: string,
		@Body() payload: UpdateUserRequestDTO
	) {
		return await this.userService.update(id, authorizedUserId, payload)
	}

	@ApiOperation({ summary: 'Delete user' })
	@ApiOkResponse({ description: 'User deleted successfully', type: UserDto })
	@Authorization()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.userService.delete(id)
	}
}
