import withPWA from 'next-pwa';
import { NextConfig } from 'next';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|eot|otf|pdf)$/,
      type: 'asset/resource',
    });
    return config;
  },
  ...pwaConfig,
};

export default nextConfig;
