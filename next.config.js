/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ["cdn.imagin.studio", "images.unsplash.com"]
    }
}

module.exports = nextConfig
