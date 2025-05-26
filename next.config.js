const {
  createVanillaExtractPlugin,
} = require("@syfxlin/next-plugin-vanilla-extract");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",

  swcMinify: true,
};

module.exports = withVanillaExtract(nextConfig);
