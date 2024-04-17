import { fileURLToPath } from 'url';
import { dirname } from 'path';
import withPlugins from 'next-compose-plugins';
import withReactSvg from 'next-react-svg';
import withImages from 'next-images';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
};

export default withPlugins([
  [withImages],
  [withReactSvg, {
    include: path.resolve(__dirname, './public/images'),
    webpack(config, options) {
      return config;
    },
  }],
], nextConfig);
