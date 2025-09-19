const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
	preset: 'jest-expo',
	transformIgnorePatterns: [
		'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg))',
	],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/',
	}),
	setupFiles: ['<rootDir>/tests/setup.ts'],
	collectCoverageFrom: [
		'src/**/*.ts',
		'src/**/container.tsx',
		'!**/*.spec.*',
		'!src/**/*.d.ts',
		'!**/node_modules/**',
		'!**/enums/**',
		'!**/interfaces/**',
		'!**/styles.ts/**',
		'!**/types.ts/**',
		'!**/services/**',
		'!src/app/*',
		'!src/i18n/**',
		'!src/themes/*',
	],
}
