/** @type {import('next').NextConfig} */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    qualities: [70, 75, 80, 85, 90],
  },
  async headers() {
    return [
      {
        source: '/:path*.mjs',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ];
  },
}

export default nextConfig;