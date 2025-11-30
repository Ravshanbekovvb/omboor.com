import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { User } from 'generated/prisma/client'
import { CreateUserRequestDTO } from './dto/create-user-request.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll() {
		return await this.userService.findAll()
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.userService.findById(id)
	}

	@Post()
	async create(@Body() payload: CreateUserRequestDTO) {
		return await this.userService.create(payload)
	}

	@Patch()
	async update(@Body() payload: Partial<User> & { id: string }) {
		return await this.userService.update(payload.id, payload)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.userService.delete(id)
	}
}
