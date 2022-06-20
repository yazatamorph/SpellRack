/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['c1.scryfall.com', 'c2.scryfall.com', 'c3.scryfall.com'],
	},
};

module.exports = nextConfig;
