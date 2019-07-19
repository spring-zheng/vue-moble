
const path = require("path")
const htmlWebpackPlugin = require('html-webpack-plugin')
// 以下插件可以使css样式以link的方式引入文件内 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 在使用vue-loader时需要引入这个插件，是vue-loader中自带的
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry: path.join(__dirname, "./src/main.js"),
    output: {
        path: path.join(__dirname, "./dist"),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        // 在上面引入了VueLoaderPlugin插件之后，必须要在这里配置文件，中间不用传参数
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.(woff2?|woff|eot|ttf|otf|svg)(\?.*)?$/, use: 'file-loader' },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:8].[ext]'
                }
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    // 使用render函数就不用配置这个了
    // resolve: {
    //        alias:{ //修改vue包被导入时的路径
    //           "vue$":"vue/dist/vue.js"
    //      }
    // }
}
