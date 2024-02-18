/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ucarecdn.com',
            },
            {
                protocol: 'https',
                hostname: 'files.edgestore.dev'  
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ]
    }
}

module.exports = nextConfig
