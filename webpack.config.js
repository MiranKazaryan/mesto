const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main:"./src/pages/index.js"
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js",
        publicPath: "",
    },
    mode: "development",
    devServer:{
        static: path.resolve(__dirname,'dist'),
        compress: true,
        open: true,
        port: 8080,
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,{
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader']
            },
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },
              // добавили правило для обработки файлов
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
};
