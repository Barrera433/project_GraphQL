const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // El modo se define en el script 'dev' o 'build'
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // Usamos [contenthash] en lugar de [hash] para mejor caché
        filename: '[name].[contenthash].js', 
    },
    resolve: {
        // Aseguramos que Webpack pueda encontrar archivos .ts y .tsx
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    // Devtool ajustado para ser compatible con Webpack 5
    devtool : 'eval-source-map',
    module: {
        rules: [
            {
                // Aplica a archivos .ts, .tsx, .js, y .jsx
                test: /\.(js|jsx|ts|tsx)$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Se han quitado los presets de aquí para usar el archivo .babelrc
                        // Esto hace que la configuración sea más limpia y externa.
                        // Ahora busca los presets en el archivo .babelrc
                    },
                },
            },
            // Loader para Source Maps, requerido por Webpack 5 si se usa devtool
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ] 
    },
    plugins: [
        new CleanWebpackPlugin(), // Ya no necesita el patrón si se usa el default.
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    // Configuración para el servidor de desarrollo
    devServer: {
        port: 3000, // Puerto diferente al backend (4000)
        hot: true,
        open: true,
        historyApiFallback: true, // Para React Router
        // Permitimos la conexión al backend en el puerto 4000
        proxy: {
            '/graphql': {
                target: 'http://localhost:4000',
                changeOrigin: true,
            },
        },
    }
};