import dfxWebpackConfig from './dfx.webpack.config.mjs';

dfxWebpackConfig.initCanisterIds();

import webpack from 'webpack';

const EnvPlugin = new webpack.EnvironmentPlugin({
  DFX_NETWORK: 'local'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // the following line is important to ensure that the canister IDs are available in the client-side code
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(EnvPlugin);

    return config;
  },
  output: "export",
}

export default nextConfig