/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
    preset: "ts-jest/presets/default-esm",

    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/src/$1",
    },

    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                diagnostics: {
                    ignoreCodes: [1343],
                },
                astTransformers: {
                    before: [
                        {
                            path: "ts-jest-mock-import-meta", // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
                            options: {
                                metaObjectReplacement: {
                                    apiKey: "AIzaSyDB1yi2Fkro_pSlxGVIfXXSHQjJ1L1Cy68",
                                },
                            },
                        },
                    ],
                },
            },
        ],
    },
};
