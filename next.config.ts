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
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|otf|svg|png|jpg|jpeg|gif|bmp|ico)$/,
    });

    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js/library/fn': 'core-js/stable',
      };
    }

    return config;
  },
  rules: [
    {
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false, 
      },
    },
  ],
  ...pwaConfig,
};

export default nextConfig;
