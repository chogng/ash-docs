import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ["build/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        console: "readonly",
        process: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
    },
  },
  {
    files: ["public/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: { document: "readonly", window: "readonly", localStorage: "readonly" },
    },
    rules: { "no-undef": "error", "no-unused-vars": "error" },
  },
  globalIgnores(["dist/**", ".build/**", "node_modules/**"]),
]);
