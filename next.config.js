/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		// Removed missingSuspenseWithCSRBailout as it's no longer valid in Next.js 15
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	reactStrictMode: true,
	distDir: "dist",
};

const standalone = process.env.STANDALONE === "true";
if (standalone) {
	nextConfig.output = "standalone";
}

module.exports = nextConfig;
