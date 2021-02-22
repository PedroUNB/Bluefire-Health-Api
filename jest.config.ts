import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

export default {
  bail: true,

  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    'src/**',
    '!src/server.ts',
    '!src/app/interfaces/**'
  ],
  coverageDirectory: '__tests__/coverage',

  coverageProvider: 'v8',

  moduleDirectories: [
    'node_modules',
    'src'
  ],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),

  preset: 'ts-jest',

  testEnvironment: 'node',

  testMatch: [
    '<rootDir>/__tests__/**/*.spec.ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}
