import { Authorization } from '@/common/decorators'
import { ProductDto } from '@/common/dto'
import { Body, Controller, Get, Post } from '@nestjs/common'
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
	@Authorization()
	@Get()
	async findAll() {
		return await this.productService.findAll()
	}

	@ApiOperation({ summary: 'Create product' })
	@ApiOkResponse({ description: 'Product created successfully', type: ProductDto })
	@Authorization()
	@Post()
	async create(@Body() payload: CreateProductRequestDTO) {
		return await this.productService.create(payload)
	}
}
