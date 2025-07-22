/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/airdrop',
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification to avoid terser issues
  experimental: {
    appDir: true,
  },
  output: "export",
  transpilePackages: [
    '@rainbow-me/rainbowkit',
    '@walletconnect/web3wallet',
    '@walletconnect/core',
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
