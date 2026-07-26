/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@base-ui/react",
      "framer-motion",
    ],
  },
  serverExternalPackages: ["bcryptjs", "jsonwebtoken"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },
}

export default nextConfig