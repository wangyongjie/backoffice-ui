module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    "**/packages/**/*.spec.{j,t}s?(x)",
  ],
  setupFiles: ['./jest/eachTest.js'],
}
