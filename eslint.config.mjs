import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Puerta unica al catalogo: solo `src/lib/catalogo.ts` lee los datos. Asi,
  // pasar a base de datos es reescribir ese archivo y no cada pantalla.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/catalogo.ts", "src/data/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "(^@/data/|/data/)(bateriaData|marcasData)$",
              message: "Lee el catalogo desde @/lib/catalogo.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
