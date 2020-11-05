module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  moduleNameMapper: {
    '\\.(css|scss|less|svg)$': '<rootDir>/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^simulator-api$': '<rootDir>/src/router/axios/api',
  },
}
