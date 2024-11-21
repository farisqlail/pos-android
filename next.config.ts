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
  ...pwaConfig,
};

export default nextConfig;
