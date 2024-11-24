const path = require('path'); // We write node.js here
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production', // Set mode to 'production'
    entry: './src/app.ts', // The entry point for Webpack
    output: {
        filename: 'bundle.js', // The output file that Webpack will generate
        path: path.resolve(__dirname, 'dist'), // The directory for the output file
    },
    devtool: false, // Disable source maps (correct for Webpack 5)
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'public'), // Serve static files from the public folder
                publicPath: '/', // Serve files at the root URL path
            },
            {
                directory: path.join(__dirname, 'dist'), // Serve the dist folder for bundle.js
                publicPath: '/dist/', // Serve bundle.js under /dist/
            },
        ],
        port: 8080, // Port number for the dev server
        historyApiFallback: true, // Helps with single-page apps to fallback to index.html
    },

    module: {
        rules: [
            {
                test: /\.ts$/, // Apply ts-loader to .ts files
                use: 'ts-loader', // Use ts-loader for TypeScript files
                exclude: /node_modules/, // Exclude node_modules folder
            },
        ],
    },

    resolve: {
        extensions: ['.ts', '.js'], // Resolve .ts and .js files
    },

    plugins: [
        new CleanWebpackPlugin(), // Clean dist folder before each build
    ],
};
