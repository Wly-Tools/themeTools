// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(path.resolve(__dirname, '../src/theme/css/global.less'));
module.exports = {
	target: 'web',
	devtool: 'inline-source-map', //控制台调试代码
	mode: 'development', // 修改为 development
	entry: path.resolve(__dirname, '../src/index.tsx'),

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: '主题工具',
			filename: 'index.html',
			template: path.resolve(__dirname, './index.ejs'),
			hash: true,
			cache: false,
			inject: true,
			minify: {
				removeComments: true,
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
				minifyCSS: true // 缩小CSS样式元素和样式属性
			},
			nodeModules: path.resolve(__dirname, '../node_modules')
		}),
		new MiniCssExtractPlugin({ filename: 'css/[name].css' }) // 修改名称命名
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/, // 图片
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/images/[name].[ext]' // 存放的位置： dist/assets/images/文件
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/, // 字体
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/fonts/[name].[ext]' // 存放的位置： dist/assets/fonts/文件
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.less$/i,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'less-loader' }
				]
			}
		]
	},
	resolve: {
		alias: {
			// "@": ["../src"],
			'@': path.resolve(__dirname, '../src/'),
			src: path.resolve(__dirname, '../src/'),
			components: path.resolve(__dirname, '../src/components'),
			config: path.resolve(__dirname, '../src/config'),
			hook: path.resolve(__dirname, '../src/hook'),
			apis: path.resolve(__dirname, '../src/apis'),
			router: path.resolve(__dirname, '../src/router'),
			store: path.resolve(__dirname, '../src/store'),
			theme: path.resolve(__dirname, '../src/theme'),
			util: path.resolve(__dirname, '../src/util'),
			i18n: path.resolve(__dirname, '../src/i18n'),
			assets: path.resolve(__dirname, '../src/assets'),
			views: path.resolve(__dirname, '../src/views')
		},
		extensions: ['.tsx', '.ts', '.wasm', '.mjs', '.js', '.json']
	},

	devServer: {
		// 新增webpack-dev-server 的配置
		headers: { 'Access-Control-Allow-Origin': '*' },
		hot: true, // 热更新
		open: {
			app: {
				name: 'goole-chrome', //走动打开chrome
				arguments: ['--incognito', '--new-window'] //无痕，新的窗口
			}
		},
		// host: '0.0.0.0',
		port: 8080, //监听端口
		setupExitSignals: true,
		compress: true,
		proxy: [
			{
				context: ['/pjServer', '/auth', '/config'],
				target: 'http://127.0.0.1:3000',
				changeOrigin: true,
				secure: false
			}
		] //代理配置
	}
};
