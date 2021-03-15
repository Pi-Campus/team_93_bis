/* eslint-disable */
const path = require('path');
require('dotenv').config();

const { env } = process;

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['~'] = path.join(path.resolve(__dirname, 'src'));
    // if (isServer) {
    //   const antStyles = /antd\/.*?\/style\/css.*?/;
    //   const origExternals = [...config.externals];
    //   config.externals = [
    //     (context, request, callback) => {
    //       if (request.match(antStyles)) return callback();
    //       if (typeof origExternals[0] === 'function') {
    //         origExternals[0](context, request, callback);
    //       } else {
    //         callback();
    //       }
    //     },
    //     ...(typeof origExternals[0] === 'function' ? [] : origExternals),
    //   ];
    // }
    if(!isServer) {
      config.module.rules.push({
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              modifyVars: {
                'primary-color': '#25718D',
              },
              javascriptEnabled: true,
            },
          },
        ],
      });
    }

    return config;
  },
  env: {
    TEDOBE_API_ENDPOINT: env.TEDOBE_API_ENDPOINT,
    AUTH_API_ENDPOINT: env.AUTH_API_ENDPOINT
  },
};
