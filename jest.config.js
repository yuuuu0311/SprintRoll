/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/src/$1",
        // "^@components/(.*)": "<rootDir>/src/components/$1",
    },
};
