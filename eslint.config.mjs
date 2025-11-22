import nextPlugin from "@next/eslint-plugin-next"

export default [
    {
        ignores: ["node_modules/**", ".next/**"],
    },
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
        },
        languageOptions: {
            parser: (await import("@typescript-eslint/parser")).default,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        rules: {
            ...nextPlugin.configs["core-web-vitals"].rules,
        },
    },
]
