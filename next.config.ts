import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	outputFileTracingIncludes: {
		'/**': ['./src/content/garden/**/*', './src/assets/fonts/**/*'],
	},
};

export default nextConfig;
