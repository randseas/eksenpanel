/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  optimizeFonts: true,
  productionBrowserSourceMaps: false,
  output: "export",
  images: {
    unoptimized: true,
  },
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
};
export default nextConfig;
