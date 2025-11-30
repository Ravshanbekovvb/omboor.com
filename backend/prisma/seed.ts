import { PrismaClient } from 'generated/prisma/client'
import { adapter } from './prisma-adapter'

const prisma = new PrismaClient({ adapter })

export async function up() {}

export async function down() {}

export async function main() {
	try {
		await down()
		await up()

		console.log('First step with: SUCCESS🍃')
	} catch (error) {
		console.log('First step with: FAIL' + error)
	}
}

main()
	.then(() => {
		console.log('Finish with: SUCCESS🍃')
	})
	.catch(err => {
		console.log('Finish with: FAIL' + err)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
