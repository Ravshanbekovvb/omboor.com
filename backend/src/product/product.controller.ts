import { LIMIT_OF_PRODUCTS } from '@/common/constants'
import { Authorization } from '@/common/decorators'
import { apiSuccessResponse } from '@/common/utils'
import { ApiProductResponseDTO, ApiProductsResponseDTO } from '@/common/utils/api-extra-models'
import { UserRole } from '@/generated/enums'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery
} from '@nestjs/swagger'
import { CreateProductRequestDTO } from './dto/create-product-request.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: 'Get all product' })
	@ApiOkResponse({
		description: 'Products returned successfully',
		type: ApiProductsResponseDTO,
		isArray: true
	})
	@ApiBadRequestResponse({ description: 'Query params page or limit must be a number' })
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

		const products = await this.productService.findAll(page, limit)

		return apiSuccessResponse(products, 'Products returned successfully')
	}

	@ApiOperation({ summary: 'Get product by name' })
	@ApiOkResponse({ description: 'Product returned successfully', type: ApiProductResponseDTO })
	@Authorization()
	@ApiQuery({ name: 'name', required: false, description: 'Product name' })
	@Get('search')
	async findByName(@Query('name') name: string) {
		const product = await this.productService.findByName(name)

		return apiSuccessResponse(product, 'Product returned successfully')
	}

	@ApiOperation({ summary: 'Get product by id' })
	@ApiOkResponse({ description: 'Product returned successfully', type: ApiProductResponseDTO })
	@ApiNotFoundResponse({ description: 'Product with this ID is not found' })
	@Authorization()
	@Get(':id')
	async findById(@Param('id') productId: string) {
		const product = await this.productService.findById(productId)

		return apiSuccessResponse(product, 'Product returned successfully')
	}

	@ApiOperation({ summary: 'Create product' })
	@ApiOkResponse({ description: 'Product created successfully', type: ApiProductResponseDTO })
	@ApiConflictResponse({ description: 'Product with this name is already exists' })
	@Authorization()
	@Post()
	async create(@Body() payload: CreateProductRequestDTO) {
		const product = await this.productService.create(payload)

		return apiSuccessResponse(product, 'Product created successfully')
	}

	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({ description: 'User updated successfully', type: ApiProductResponseDTO })
	@ApiNotFoundResponse({ description: 'Product with this ID is not found' })
	@Authorization()
	@Patch(':id')
	async update(@Param('id') userId: string, @Body() payload: CreateProductRequestDTO) {
		const product = await this.productService.update(userId, payload)

		return apiSuccessResponse(product, 'Product updated successfully')
	}

	@ApiOperation({ summary: 'Delete user' })
	@ApiOkResponse({ description: 'User deleted successfully', type: ApiProductResponseDTO })
	@ApiNotFoundResponse({ description: 'Product with this ID is not found' })
	@Authorization()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const product = await this.productService.delete(id)

		return apiSuccessResponse(product, 'Product deleted successfully')
	}
}
