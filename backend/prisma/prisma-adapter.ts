import { PrismaPg } from '@prisma/adapter-pg'

import 'dotenv-expand/config'
import 'dotenv/config'

const connectionString = process.env.POSTGRES_URI

export const adapter = new PrismaPg({ connectionString })
