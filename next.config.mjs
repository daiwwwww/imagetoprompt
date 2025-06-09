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
    // 禁用 SWC 并使用 Babel 以提高 WebContainer 兼容性
    swcMinify: false,
    experimental: {
        forceSwcTransforms: false,
    },
    // 添加 webpack 配置以避免原生模块问题
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
};

export default nextConfig;