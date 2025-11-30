import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn-icons-png.flaticon.com',
				pathname: '/512/219/219988.png'
			}
		]
	}
}

export default nextConfig
