module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test/**/*?(-|.)(spec|test).(js|ts)?(x)', '**/tests/**/*.spec.(js|ts)?(x)'],
  setupTestFrameworkScriptFile: './test/setupTest.js',
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testURL: 'http://localhost'
};
