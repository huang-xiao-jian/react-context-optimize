module.exports = {
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|giff|webp|svg)$':
      '@coco-platform/jest-tools/lib/asset-transformer.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.css$': '@coco-platform/jest-tools/lib/css-ignore.js',
    '\\.pcss': '@coco-platform/jest-tools/lib/css-modules.js',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.spec.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/'],
};
