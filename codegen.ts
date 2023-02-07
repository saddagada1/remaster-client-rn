import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://192.168.0.139:8080/graphql",
  documents: "./graphql/**/*.graphql",
  generates: {
    "./generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
