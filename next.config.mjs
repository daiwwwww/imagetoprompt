/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
    },
    typescript: {
        // !! 警告 !!
        // 允许在生产构建过程中成功完成，即使项目存在类型错误。
        // !! 警告 !!
        ignoreBuildErrors: true,
    },
    // Disable SWC and use Babel instead for WebContainer compatibility
    swcMinify: false,
    experimental: {
        forceSwcTransforms: false,
    },
};

export default nextConfig;