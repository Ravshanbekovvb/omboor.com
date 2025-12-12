import {
	ProductDefaultArgs,
	ProductGetPayload,
	SelectSubset
} from '@/generated/internal/prismaNamespace'
import { ProductFindManyArgs } from '@/generated/models'
import { PrismaService } from '@/prisma/prisma.service'
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateProductRequestDTO } from './dto/create-product-request.dto'

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll<T extends ProductFindManyArgs>(
		page: string,
		limit: string,
		args?: SelectSubset<T, ProductFindManyArgs>
	): Promise<{ products: ProductGetPayload<T>[]; totalPages }> {
		const params = args ?? {}

		const pageNum = Number(page)
		const limitNum = Number(limit)

		if (isNaN(pageNum) || isNaN(limitNum))
			throw new BadRequestException('Query params page or limit must be a number')

		const [products, total] = await Promise.all([
			(await this.prisma.product.findMany({
				...params,
				skip: (pageNum - 1) * limitNum,
				take: limitNum
			})) as ProductGetPayload<T>[],
			await this.prisma.product.count()
		])

		const totalPages = Math.ceil(total / limitNum)

		return { products, totalPages }
	}

	async findByName<T extends ProductDefaultArgs>(
		name: string,
		args?: SelectSubset<T, ProductDefaultArgs>
	): Promise<ProductGetPayload<T> | undefined> {
		const params = args ?? {}

		const product = (await this.prisma.product.findFirst({
			where: {
				name
			},
			...params
		})) as ProductGetPayload<T> | undefined

		return product
	}

	async findById<T extends ProductDefaultArgs>(
		id: string,
		args?: SelectSubset<T, ProductDefaultArgs>
	): Promise<ProductGetPayload<T>> {
		const params = args ?? {}

		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
			...params
		})

		if (!product) throw new NotFoundException(`Product with this ID: #${id} is not found`)

		return product as ProductGetPayload<T>
	}

	async create<T extends ProductDefaultArgs>(
		payload: CreateProductRequestDTO,
		args?: SelectSubset<T, ProductDefaultArgs>
	): Promise<ProductGetPayload<T>> {
		const params = args ?? {}

		const product = await this.findByName(payload.name)

		if (product)
			throw new ConflictException(`Product with this name: ${payload.name} is already exists`)

		return (await this.prisma.product.create({
			data: payload,
			...params
		})) as ProductGetPayload<T>
	}

	async update<T extends ProductDefaultArgs>(
		productId: string,
		payload: CreateProductRequestDTO,
		args?: SelectSubset<T, ProductDefaultArgs>
	): Promise<ProductGetPayload<T>> {
		const params = args ?? {}

		const { id } = await this.findById(productId)

		return (await this.prisma.product.update({
			where: {
				id
			},
			data: payload,
			...params
		})) as ProductGetPayload<T>
	}

	async delete<T extends ProductDefaultArgs>(
		productId: string,
		args?: SelectSubset<T, ProductDefaultArgs>
	): Promise<ProductGetPayload<T>> {
		const params = args ?? {}

		const { id } = await this.findById(productId)

		return (await this.prisma.product.delete({
			where: {
				id
			},
			...params
		})) as ProductGetPayload<T>
	}
}
