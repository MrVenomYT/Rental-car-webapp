/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ["cdn.imagin.studio"]
    }
}

module.exports = nextConfig
