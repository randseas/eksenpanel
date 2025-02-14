/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  optimizeFonts: true,
  productionBrowserSourceMaps: false,
  typescript: {
    tsconfigPath: "./tsconfig.json",
    ignoreBuildErrors: false,
  },
  compress: true,
  swcMinify: true,
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-left",
  },
  crossOrigin: "anonymous",
  images: {
    domains: ["localhost", "waultdex.com"],
  },
  async redirects() {
    return [];
  },
};
export default nextConfig;
