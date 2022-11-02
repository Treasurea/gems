const timestamp = new Date().getTime();
const path = require('path');

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  lintOnSave: false,
  productionSourceMap: true,
  configureWebpack: {
    plugins: [
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          use: ['babel-loader', '@mdx-js/vue-loader'],
        },
      ],
    },
    output: {
      filename: `js/[name].${timestamp}.js`,
      chunkFilename: '[id].[chunkhash].js',
    },
    performance: {
      hints: false,
      maxEntrypointSize: 256000,
      maxAssetSize: 256000,
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: false,
      hot: true,
      allowedHosts: 'all',
      port: 8080,
      host: '0.0.0.0',
      proxy: {
        'models/model/infer': {
          target: 'https://dev.console.kubeboost.caas.fii-fmc.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api/v1': '',
          },
        },
        // '/api/v1/api/identification/org': {
        //   target: 'http://10.187.43.13:8888',
        //   changeOrigin: true,
        //   pathRewrite: {
        //     '^/api/v1/': '',
        //   },
        // },
        // '/api/v1/sso/user': {
        //   target: 'http://192.168.3.112:8808',
        //   changeOrigin: true,
        //   pathRewrite: {
        //     '^/api/v1/': '',
        //   },
        // },
        // '/api/v1/api/authentication/instance': {
        //   target: 'http://10.187.42.179:8001',
        //   changeOrigin: true,
        //   pathRewrite: {
        //     '^/api/v1/': '',
        //   },
        // },
        // '/api/v1/api/identification/org': {
        //   target: 'http://10.187.42.179:8888',
        //   changeOrigin: true,
        //   pathRewrite: {
        //     '^/api/v1/': '',
        //   },
        // },
        // '/api/v1/api/authentication/user': {
        //   target: 'http://10.187.42.179:8001',
        //   changeOrigin: true,
        //   pathRewrite: {
        //     '^/api/v1/': '',
        //   },
        // },
        '/api/v1': {
          target: 'https://dev.console.kubeboost.caas.fii-fmc.com',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/api/v1': '/v1',
          // },
        },
        '/realtime/': {
          target: 'https://dev.console.kubeboost.caas.fii-fmc.com',
          changeOrigin: true,
          pathRewrite: {
            '^/realtime/': '/',
          },
        },
        '/api/lokiExport/': {
          target: 'https://dev.console.kubeboost.caas.fii-fmc.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api/lokiExport/': '/lokiExport/',
          },
        },
      },
    },
    resolve: {
      alias: {
        assets: '@/assets',
        views: '@/views',
        plugins: '@/plugins',
      },
    },
  },
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: 'expanded' },
      },
    },
    extract: { ignoreOrder: true },
  },
};
