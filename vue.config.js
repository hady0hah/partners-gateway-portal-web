const { defineConfig } = require('@vue/cli-service')

var webpack = require('webpack');
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
						PACKAGE_VERSION: '"' + version + '"'
				}
			})
		]
  },
})
