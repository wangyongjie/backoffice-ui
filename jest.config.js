const esModules = ['echarts', 'zrender'].join('|');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    "**/stories/**/*.spec.{j,t}s?(x)",
  ],
  setupFiles: ['./stories/eachTest.js'],
  transform: {
    [`(${esModules}).+\\.js$`]: 'babel-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
}
