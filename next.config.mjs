/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // 完全禁用 SWC，使用 Babel
    swcMinify: false,
    experimental: {
        forceSwcTransforms: false,
        esmExternals: false,
    },
    // 强制使用 Babel 而不是 SWC
    compiler: {
        // 禁用所有 SWC 功能
    },
    // 优化的 webpack 配置
    webpack: (config, { isServer, dev }) => {
        // 禁用原生模块
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                url: false,
                zlib: false,
                http: false,
                https: false,
                assert: false,
                os: false,
                path: false,
            };
        }
        
        // 忽略特定的模块警告
        config.ignoreWarnings = [
            /Failed to parse source map/,
            /Critical dependency: the request of a dependency is an expression/,
        ];
        
        return config;
    },
};

export default nextConfig;