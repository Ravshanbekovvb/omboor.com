import { countries } from '../constants'

export const locales = countries.map(country => country.code.toLowerCase())
