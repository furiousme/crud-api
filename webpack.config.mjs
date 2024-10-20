import path from 'node:path';
import nodeExternals from 'webpack-node-externals';
import Dotenv from 'dotenv-webpack';

export default {
  entry: './src/index.ts',
  target: 'node',
  mode: 'production',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist'),
  },
  plugins: [
    new Dotenv({
      path: `.env.production`,
    }),
  ],
};
