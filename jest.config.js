module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    "**/stories/**/*.spec.{j,t}s?(x)",
  ],
  setupFiles: ['./stories/eachTest.js'],
}
