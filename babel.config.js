const presets = ['module:metro-react-native-babel-preset']
const plugins = []

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.json'],
    alias: {
      '@': './src',
    },
  },
  'react-native-reanimated/plugin',
])

plugins.push([
  'dotenv-import',
  {
    moduleName: '@env',
    path: '.env',
    blacklist: null,
    whitelist: null,
    safe: false,
    allowUndefined: false,
  },
])

module.exports = {
  presets,
  plugins,
}
