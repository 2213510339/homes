import * as webpack from "webpack";

const {join} = require('path');
const context = __dirname;
var path = require('path');

module.exports = {
    context: context,
    module: 'home',
    // entry: './src/index.js', // 入口文件
    entry: ['webpack-hot-middleware/client', './src/index.js'],
    output: {
        filename: 'out.js',
        path: path.resolve(__dirname, 'public')
    },
    htmlTarget: join(context, 'public/index.html'), // html入口配置
    publicPath: '/',
    port: 4000,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    settings: {
        'import/resolver': {
            node: {
                paths: [path.resolve(__dirname, 'src')]
            }
        }
    }
}