import { LIMIT_OF_PRODUCTS } from '@/common/constants'
import { Authorization } from '@/common/decorators'
import { ProductDto } from '@/common/dto'
import { UserRole } from '@/generated/enums'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger'
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
	@ApiQuery({ name: 'page', required: false, description: 'Page number, default 1' })
	@ApiQuery({
		name: 'limit',
		required: false,
		description: 'Items per page, default 10'
	})
	@Get()
	async findAll(@Query('page') productsPage?: string, @Query('limit') productsLimit?: string) {
		const limit = productsLimit || LIMIT_OF_PRODUCTS
		const page = productsPage || '1'

		return await this.productService.findAll(page, limit)
	}

	@ApiOperation({ summary: 'Get product by name' })
	@ApiOkResponse({ description: 'Product returned successfully', type: ProductDto })
	@Authorization()
	@Get('search')
	async findByName(@Query('name') name: string) {
		return await this.productService.findByName(name)
	}

	@ApiOperation({ summary: 'Get product by id' })
	@ApiOkResponse({ description: 'Product returned successfully', type: ProductDto })
	@Authorization()
	@Get(':id')
	async findById(@Param('id') productId: string) {
		return await this.productService.findById(productId)
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
