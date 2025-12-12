import { Authorization } from '@/common/decorators'
import { ProductDto } from '@/common/dto'
import { Unit, UserRole } from '@/generated/enums'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { CreateProductRequestDTO } from './dto/create-product-request.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: 'Get all product' })
	@ApiOkResponse({
		description: 'Products returned successfully',
		type: ProductDto,
		isArray: true
	})
	@Authorization(UserRole.ADMIN)
	@Get()
	async findAll() {
		console.log(Unit)

		return await this.productService.findAll()
	}

	@ApiOperation({ summary: 'Get product by id' })
	@ApiOkResponse({ description: 'Product returned successfully', type: ProductService })
	@Authorization()
	@Get(':id')
	async findById(@Param('id') productId: string) {
		return await this.productService.findById(productId)
	}

	@ApiOperation({ summary: 'Get product by name' })
	@ApiOkResponse({ description: 'Product returned successfully', type: ProductService })
	@Authorization()
	@Get('search/:name')
	async findByName(@Param('name') name: string) {
		return await this.productService.findByName(name)
	}

	@ApiOperation({ summary: 'Create product' })
	@ApiOkResponse({ description: 'Product created successfully', type: ProductDto })
	@Authorization()
	@Post()
	async create(@Body() payload: CreateProductRequestDTO) {
		return await this.productService.create(payload)
	}

	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({ description: 'User updated successfully', type: ProductDto })
	@Authorization()
	@Patch(':id')
	async update(@Param('id') userId: string, @Body() payload: CreateProductRequestDTO) {
		return await this.productService.update(userId, payload)
	}

	@ApiOperation({ summary: 'Delete user' })
	@ApiOkResponse({ description: 'User deleted successfully', type: ProductDto })
	@Authorization()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.productService.delete(id)
	}
}
