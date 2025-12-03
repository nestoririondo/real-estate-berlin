import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Enforce function expressions (const arrow functions) instead of function declarations
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      // Enforce named exports instead of default exports
      // Disabled for Next.js which requires default exports for pages and layouts
      "import/no-default-export": "off",
    },
  },
  {
    // Exclude shadcn UI components from func-style rule (they follow their own conventions)
    files: ["components/ui/**/*.tsx", "components/ui/**/*.ts"],
    rules: {
      "func-style": "off",
    },
  },
]);

export default eslintConfig;
