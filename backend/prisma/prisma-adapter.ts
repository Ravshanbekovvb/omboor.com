import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.POSTGRES_URI

export const adapter = new PrismaPg({ connectionString })
