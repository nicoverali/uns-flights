// Webpack uses this to work with directories
const path = require('path');

// Use to export processed CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Main configuration object. Determines Webpack behavior
module.exports = {

    // Path to entry point. Webpack will begin here
    entry: './src/javascript/index.jsx',

    // Path and filename of result bundles
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // Add steps to bundling process
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                // Loaders are apply from bottom to top
                use: [
                    {
                        // After all CSS loaders, it gets all transformed CSS and extraxts
                        // it into a separate single bundled file
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // This loader resolves url() and @imports inside CSS
                        loader: "css-loader"
                    },
                    {
                        // Then we apply postCSS fixes like autoprefixer and minifying
                        loader: "postcss-loader"
                    },
                    {
                        // First we transform SASS to standard CSS
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ],
            },
            {
                // Loads images
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                       {
                         loader: "file-loader",
          
                         // In options we can set different things like format
                         // and directory to save
                         options: {
                           outputPath: 'images'
                         }
                       }
                    ]
            },
            {
                // Loads fonts
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                       {
                         loader: "file-loader",
                         options: {
                           outputPath: 'fonts'
                         }
                       }
                     ]
              }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],


    mode: 'development'

}