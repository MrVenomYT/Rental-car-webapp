/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ["cdn.imagin.studio", "images.unsplash.com"]
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                "supports-color": false,
                bufferutil: false,
                "utf-8-validate": false,
            };
        }
        return config;
    }
}

module.exports = nextConfig
