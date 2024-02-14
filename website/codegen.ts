import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://yourdomain.com/graphql',
  documents: 'src/**/*.tsx',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
