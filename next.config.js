/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    webpack: (config, { webpack }) => {
        // Add the ProvidePlugin to your Webpack plugins
        config.plugins.push(
            new webpack.ProvidePlugin({
                Amplify: 'aws-amplify',
            })
        );

        return config;
    },
};

module.exports = nextConfig;
